import type { PageServerLoad } from './$types';

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
