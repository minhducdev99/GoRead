export const getUsername = () => {
    const userLocaStorage = localStorage.getItem('userInfo')
    if (userLocaStorage) {
        const currentUser = JSON.parse(userLocaStorage);
        return currentUser.email
    }
    return ''
}