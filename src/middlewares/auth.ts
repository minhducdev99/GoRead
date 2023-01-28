
export const auth = ({ to, next, router }: any) => {
    const userLocaStorage = localStorage.getItem('userInfo')
    if (userLocaStorage) {
        const currentUser = JSON.parse(userLocaStorage);
        if (new Date(currentUser.stsTokenManager.expirationTime) < new Date()) {
            return next({ path: "/login" });
        }
        if (to.path === '/admin') {
            return next('/admin/blogs')
        }
        return next();
    } else {
        return next({ path: "/login" });
    }
};

// export const logged = ({ next, router }: any) => {
//     const currentUser = CURRENT_USER;
//     if (currentUser) {
//         return next({ name: "/me" });
//     }
//     return next();
// };
