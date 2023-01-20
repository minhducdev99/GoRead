
export const auth = ({ next, router }: any) => {
    const userLocaStorage = localStorage.getItem('userInfo')
    if (userLocaStorage) {
        const currentUser = JSON.parse(userLocaStorage);
        if (new Date(currentUser.stsTokenManager.expirationTime) < new Date()) {
            console.log('auth middleware');
            return next({ path: "/login" });
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
