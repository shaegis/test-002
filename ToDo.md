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


마지막으로 해야 하는 질문.



서버 터미널 출력입니다.
Raw result: [
  {
    id: '3knxstyt2r5speepi7kzdoer',
    age: null,
    username: 'tester001',
    passwordHash: '$argon2id$v=19$m=19456,t=2,p=1$2wTyfiasXnwU+wip/LLCcA$oR30kMYpo89Ow0zKmxnvLX4zLCVS/sNnx4oG0l8Z23U',
    encryptionKey: 'Ms1jReZ9F2tkGWGGtBzGdX5AYUL1yuZKbR13en55gXA='
  }
]
Login existingUser: {
  id: '3knxstyt2r5speepi7kzdoer',
  age: null,
  username: 'tester001',
  passwordHash: '$argon2id$v=19$m=19456,t=2,p=1$2wTyfiasXnwU+wip/LLCcA$oR30kMYpo89Ow0zKmxnvLX4zLCVS/sNnx4oG0l8Z23U',
  encryptionKey: 'Ms1jReZ9F2tkGWGGtBzGdX5AYUL1yuZKbR13en55gXA='
}
Login event.locals.user: {
  id: '3knxstyt2r5speepi7kzdoer',
  username: 'tester001',
  encryptionKey: undefined
}
dashBoard event.locals.user: {
  id: '3knxstyt2r5speepi7kzdoer',
  username: 'tester001',
  encryptionKey: undefined
}
현재의 login/+page.server.ts
import { hash, verify } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    if (event.locals.user) {
        return redirect(302, '/dashBoard');
    }
    return {};
};

export const actions: Actions = {
    login: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        if (!validateUsername(username)) {
            return fail(400, { message: 'Invalid username' });
        }
        if (!validatePassword(password)) {
            return fail(400, { message: 'Invalid password' });
        }

        const result = await db
            .select()
//            .select({
//                id: user.id,
//                username: user.username,
//                passwordHash: user.password_hash,
//                encryption_key: user.encryption_key,
//            })
            .from(user)
            .where(eq(user.username, username));
        console.log("Raw result:", result);

        const existingUser = result.at(0);
        if (!existingUser) {
            return fail(400, { message: 'Incorrect username or password' });
        }
        console.log("Login existingUser:", existingUser);

        const validPassword = await verify(existingUser.passwordHash, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        });
        if (!validPassword) {
            return fail(400, { message: 'Incorrect username or password' });
        }

        const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(sessionToken, existingUser.id);
        auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

        event.locals.user = {
            id: existingUser.id,
            username: existingUser.username,
            encryptionKey: existingUser.encryption_key,
        };
        console.log("Login event.locals.user:", event.locals.user); // 디버깅
        return redirect(302, '/dashBoard');
    }
};

function generateUserId() {
    const bytes = crypto.getRandomValues(new Uint8Array(15));
    const id = encodeBase32LowerCase(bytes);
    return id;
}

function validateUsername(username: unknown): username is string {
    return (
        typeof username === 'string' &&
        username.length >= 3 &&
        username.length <= 31 &&
        /^[a-z0-9_-]+$/.test(username)
        );
}

function validatePassword(password: unknown): password is string {
    return (
        typeof password === 'string' &&
        password.length >= 6 &&
        password.length <= 255
        );
}
문제의 범위가 좁혀졌나요?

