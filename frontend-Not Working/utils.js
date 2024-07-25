export async function getAllUsers (url){
    try {
        const response = await fetch(url);
        const users = await response.json();
        return users
    } catch (error) {
        return `error`
    }
}

export async function getOneUser (url){
    try {
        const response = await fetch(url);
        const users = await response.json();
        return url
    } catch (error) {
        return `error`
    }
}