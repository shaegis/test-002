<script lang="ts">
    import { encryptionKey } from '$lib/stores/encryptionKey';
    import { drNoteState } from '$lib/stores/drNoteState';
    import { get } from 'svelte/store';
    import type { PageServerData } from './$types';

    // $props로 데이터 선언
    let { data } = $props<{ data: PageServerData & { user?: { encryptionKey: string } } }>();
    console.log("dashBoard data.user:", data?.user); // 디버깅

//    // 초기 설정: encryptionKey가 없으면 설정
//    if (data?.user?.encryptionKey && !get(encryptionKey)) {
//        encryptionKey.set(data.user.encryptionKey);
//        console.log("Encryption key set:", data.user.encryptionKey); // 디버깅용
//    }
//
//    // 반응형 상태와 파생 상태
//    let drNote = $state("");
//    let canSave = $derived(get(encryptionKey) !== null);
//
//    // drNoteState가 변경될 때 drNote 업데이트
//    $effect(() => {
//        drNote = JSON.stringify($drNoteState.progress.subjective, null, 2);
//    });
//
    let drNote = $state("");
    let canSave = $derived(get(encryptionKey) !== null);

    $effect(() => {
        if (data?.user?.encryptionKey) {
            encryptionKey.set(data.user.encryptionKey);
            console.log("Encryption key set:", data.user.encryptionKey); // 디버깅
        } else {
            console.error("No encryptionKey in data.user"); // 디버깅
        }
        drNote = JSON.stringify($drNoteState.progress.subjective, null, 2);
    });

    // 클립보드 복사 함수
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
        <!-- show store data -->
        <pre>{JSON.stringify($drNoteState.progress.subjective, null, 2)}</pre>
        <!-- show whole sentence -->
        <pre>{drNote}</pre>
        <button onclick={copyToClipboard}>Copy All</button>
    </section>
</article>
