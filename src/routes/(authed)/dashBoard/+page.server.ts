import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/login');
    }
    console.log("dashBoard event.locals.user:", event.locals.user); // 디버깅
    return {
        user: {
            id: event.locals.user.id,
            username: event.locals.user.username,
            encryptionKey: event.locals.user.encryptionKey,
        },
    };
};
