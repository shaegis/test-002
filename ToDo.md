# Bug


# 기능개선
* Migragte to Web Crypto API from oslo/crypto.
* READ 정보보안개론.



# Error 처리방식
* use toast message or modal
## where?
* isLocalStorageAvailable() in lib/utils/localStorage.ts


# DB
* 현재는 drizzle ORM
* 향후 migration-based workflow를 해야 함.
    * version control of DB
    * roll-back
* knex.js or prisma
* 하지만 장단점을 잘 살펴볼 것.





사용자가 제공한 상황과 에러 로그를 바탕으로 문제를 분석하고 해결 방법을 제시하겠습니다. 현재 상황은 다음과 같습니다:
- 로그인 후 `dashBoard`로 이동하면 "Can save to localStorage: false"가 표시됨.
- `/progress`로 이동하여 폼을 작성하고 "Manage browser storage"에서 "Save"를 클릭하면 "Encryption key is not available" 에러 발생.

---

### **에러 분석**
#### **에러 메시지**
```
Encryption key is not available. localStorage.ts:75:20
    saveToLocalStorage localStorage.ts:75
    onSave Subjective.svelte:118
    on_click ManageLocalStorageDialog.svelte:30
    handle_event_propagation events.js:249
```
- **위치**: `localStorage.ts`의 `saveToLocalStorage` 함수 75번째 줄:
  ```typescript
  const keyValue = get(encryptionKey);
  if (!keyValue) {
      console.error("Encryption key is not available."); // 여기서 에러 발생
      return;
  }
  ```
- **문제**: `get(encryptionKey)`가 `null`을 반환하며, `encryptionKey` 스토어가 설정되지 않았음.

#### **dashBoard 상태**
- `dashBoard/+page.svelte`에서:
  - "Can save to localStorage: false"가 표시됨 → `let canSave = $derived(get(encryptionKey) !== null);`가 `false`를 반환.
  - 즉, `dashBoard`에서 `encryptionKey`가 설정되지 않았음.

#### **코드 확인**
- **`dashBoard/+page.svelte`**:
  ```svelte
  if (data?.user?.encryptionKey && !get(encryptionKey)) {
      encryptionKey.set(data.user.encryptionKey);
      console.log("Encryption key set:", data.user.encryptionKey);
  }
  ```
  - 이 조건문이 실행되지 않았거나, `data.user.encryptionKey`가 전달되지 않았을 가능성.

- **`dashBoard/+page.server.ts`**:
  ```typescript
  export const load: PageServerLoad = async (event) => {
      if (!event.locals.user) {
          return redirect(302, '/login');
      }
      return {
          user: {
              id: event.locals.user.id,
              username: event.locals.user.username,
              encryptionKey: event.locals.user.encryptionKey,
          },
      };
  };
  ```

- **`login/+page.server.ts`**:
  ```typescript
  event.locals.user = {
      id: existingUser.id,
      username: existingUser.username,
      encryptionKey: existingUser.encryptionKey,
  };
  ```

---

### **문제 원인**
1. **`data.user.encryptionKey`가 누락됨**:
   - `dashBoard/+page.server.ts`에서 `event.locals.user.encryptionKey`를 가져오지만, 값이 `undefined`이거나 전달되지 않음.
   - `login/+page.server.ts`에서 `event.locals.user`에 `encryptionKey`를 설정했으나, DB의 `existingUser.encryptionKey`가 `null`이거나 예상과 다를 수 있음.

2. **스토어 설정 실패**:
   - `dashBoard/+page.svelte`에서 `encryptionKey.set()`이 호출되지 않음. 디버깅 로그(`console.log("Encryption key set:", ...)`)가 출력되지 않았다면 조건문이 실행되지 않은 것.

3. **세션 문제**:
   - 로그인 후 세션이 유지되지 않거나, `event.locals.user`가 리다이렉션 후 초기화되었을 가능성.

---

### **해결 방법**

#### **1. 디버깅으로 원인 파악**
- **`dashBoard/+page.svelte`**에 디버깅 로그 추가:
  ```svelte
  <script lang="ts">
      import { encryptionKey } from '$lib/stores/encryptionKey';
      import { drNoteState } from '$lib/stores/drNoteState';
      import { get } from 'svelte/store';
      import type { PageServerData } from './$types';

      let { data } = $props<{ data: PageServerData & { user?: { encryptionKey: string } } }>();

      // 디버깅 로그 추가
      console.log("dashBoard data:", data);
      console.log("dashBoard data.user:", data?.user);
      console.log("dashBoard data.user.encryptionKey:", data?.user?.encryptionKey);

      if (data?.user?.encryptionKey && !get(encryptionKey)) {
          encryptionKey.set(data.user.encryptionKey);
          console.log("Encryption key set:", data.user.encryptionKey);
      }

      let drNote = $state("");
      let canSave = $derived(get(encryptionKey) !== null);

      $effect(() => {
          drNote = JSON.stringify($drNoteState.progress.subjective, null, 2);
      });

      function copyToClipboard() {
          navigator.clipboard.writeText(drNote);
      }
  </script>

  <article class="prose">
      <h1>{data.user.username} Dash-board</h1>
      <p>You are in the authed & welcomed.</p>
      <p>Your user ID is {data.user.id}.</p>
      <p>Can save to localStorage: {canSave}</p>
      <section>
          <h3>Subjective Data</h3>
          <pre>{JSON.stringify($drNoteState.progress.subjective, null, 2)}</pre>
          <pre>{drNote}</pre>
          <button onclick={copyToClipboard}>Copy All</button>
      </section>
  </article>
  ```
  - **확인**:
    - `dashBoard data.user.encryptionKey`가 출력되는지? (`undefined`라면 문제 발생 지점임)
    - "Encryption key set" 로그가 출력되는지?

#### **2. `encryptionKey` 값 확인**
- **`login/+page.server.ts`**에서 `existingUser.encryptionKey` 확인:
  ```typescript
  console.log("Login existingUser:", existingUser);
  event.locals.user = {
      id: existingUser.id,
      username: existingUser.username,
      encryptionKey: existingUser.encryptionKey,
  };
  console.log("Login event.locals.user:", event.locals.user);
  ```
  - DB에서 가져온 `existingUser.encryptionKey`가 `null`인지 확인.
  - `event.locals.user`에 값이 제대로 설정되었는지 확인.

- **DB 확인**:
  ```bash
  psql -h localhost -U postgres -d test001db
  SELECT id, username, encryption_key FROM "user" WHERE id = 'yojrukyvxibl5vseeycjwkt4';
  ```
  - `encryption_key` 컬럼에 값이 있는지 확인.

#### **3. `dashBoard`에서 강제 설정**
- `data.user.encryptionKey`가 누락되는 경우를 대비해 강제 설정:
  ```svelte
  <script lang="ts">
      // ... (기존 임포트 동일)
      let { data } = $props<{ data: PageServerData & { user?: { encryptionKey: string } } }>();

      console.log("dashBoard data.user:", data?.user);

      // 강제 설정: 값이 있으면 무조건 설정
      if (data?.user?.encryptionKey) {
          encryptionKey.set(data.user.encryptionKey);
          console.log("Encryption key set:", data.user.encryptionKey);
      } else {
          console.error("No encryptionKey in data.user");
      }

      let drNote = $state("");
      let canSave = $derived(get(encryptionKey) !== null);

      $effect(() => {
          drNote = JSON.stringify($drNoteState.progress.subjective, null, 2);
      });

      function copyToClipboard() {
          navigator.clipboard.writeText(drNote);
      }
  </script>
  ```
  - `!get(encryptionKey)` 조건을 제거하여, 값이 있으면 항상 설정하도록 수정.

#### **4. 루트 레이아웃에서 설정 (권장)**
- 모든 페이지에서 `encryptionKey`가 설정되도록 `/routes/+layout.svelte`와 `+layout.server.ts` 추가:
  - **`+layout.server.ts`**:
    ```typescript
    import type { LayoutServerLoad } from './$types';
    import { redirect } from '@sveltejs/kit';

    export const load: LayoutServerLoad = async (event) => {
        if (!event.locals.user && event.url.pathname !== '/login' && event.url.pathname !== '/signup') {
            return redirect(302, '/login');
        }
        return {
            user: event.locals.user ? {
                id: event.locals.user.id,
                username: event.locals.user.username,
                encryptionKey: event.locals.user.encryptionKey,
            } : undefined,
        };
    };
    ```
  - **`+layout.svelte`**:
    ```svelte
    <script lang="ts">
        import { encryptionKey } from '$lib/stores/encryptionKey';
        import { get } from 'svelte/store';

        let { data } = $props<{ data: { user?: { encryptionKey: string } } }>();

        if (data?.user?.encryptionKey && !get(encryptionKey)) {
            encryptionKey.set(data.user.encryptionKey);
            console.log("Layout encryption key set:", data.user.encryptionKey);
        }
    </script>

    <slot />
    ```
  - `dashBoard/+page.svelte`에서 `encryptionKey` 설정 코드를 제거 가능:
    ```svelte
    <script lang="ts">
        import { drNoteState } from '$lib/stores/drNoteState';
        import { encryptionKey } from '$lib/stores/encryptionKey';
        import { get } from 'svelte/store';
        import type { PageServerData } from './$types';

        let { data } = $props<{ data: PageServerData & { user?: { encryptionKey: string } } }>();

        let drNote = $state("");
        let canSave = $derived(get(encryptionKey) !== null);

        $effect(() => {
            drNote = JSON.stringify($drNoteState.progress.subjective, null, 2);
        });

        function copyToClipboard() {
            navigator.clipboard.writeText(drNote);
        }
    </script>

    <article class="prose">
        <h1>{data.user.username} Dash-board</h1>
        <p>You are in the authed & welcomed.</p>
        <p>Your user ID is {data.user.id}.</p>
        <p>Can save to localStorage: {canSave}</p>
        <section>
            <h3>Subjective Data</h3>
            <pre>{JSON.stringify($drNoteState.progress.subjective, null, 2)}</pre>
            <pre>{drNote}</pre>
            <button onclick={copyToClipboard}>Copy All</button>
        </section>
    </article>
    ```

---

### **결론**
- **문제 원인**: `dashBoard/+page.svelte`에서 `encryptionKey`가 설정되지 않음. `data.user.encryptionKey`가 `undefined`이거나 조건문이 실행되지 않음.
- **해결**:
  1. 디버깅 로그로 `data.user.encryptionKey` 확인.
  2. DB에서 `encryption_key` 값 확인.
  3. 루트 레이아웃에서 `encryptionKey`를 설정하는 것이 가장 안정적 (권장).

#### **다음 단계**
- 디버깅 로그를 확인하여 `data.user.encryptionKey`가 출력되는지 확인.
- 출력되지 않으면 `login/+page.server.ts`의 로그와 DB를 점검.
- 최종적으로 `+layout.svelte` 적용을 고려.

로그 결과를 공유해 주시면 더 구체적으로 도와드리겠습니다!
