// to, from, next
const CURRENT_USER = true;
export const auth = ({ next, router }: any) => {
    const currentUser = CURRENT_USER;
    if (!currentUser) {
        console.log('auth middleware');
        return next({ path: "/login" });
    }
    return next();
};

export const logged = ({ next, router }: any) => {
    const currentUser = CURRENT_USER;
    if (currentUser) {
        return next({ name: "/me" });
    }
    return next();
};
