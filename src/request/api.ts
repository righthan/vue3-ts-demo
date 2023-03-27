import service from '.';
interface loginData {
    username: string,
    password: string
}

export function login(data: loginData) {
    return service({
        url: '/login',
        method: 'post',
        data
    })
}

export function getGoodsList() {
    return service({
        url: '/goodsList',
        method: 'get'
    })
}

export function getUserList() {
    return service({
        url: '/userList',
        method: 'get'
    })
}

export function getRoleList() {
    return service({
        url: '/roleList',
        method: 'get'
    })
}
