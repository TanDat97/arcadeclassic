const loadAuthHeader = () => {
    // return authorization header with jwt token
    let token = (localStorage.getItem('studio/token'));
    if (token) {
        return {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        }
    } else {
        return {}
    }
}

const makeAuthHeader = (token) => {
    if (token) {
        return {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token
        }
    } else {
        return {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }
}

export default {
    loadAuthHeader,
    makeAuthHeader,

}