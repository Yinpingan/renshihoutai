

import request from '@/utils/request'


export function getlist(data) {
    return request({
        url: `/sys/role?page=${data.page}&pagesize=${data.pagesize}`,
        data
    })
}

export function putlist(data) {
    return request({
        url: `/sys/role/${data.id}`,
        method: 'put',
        data
    })
}
export function getlists(data) {
    return request({
        url: `/sys/role/${data.id}`,
        data
    })
}
export function addlist(data) {
    return request({
        url: `/sys/role`,
        method: 'post',
        data
    })
}
export function dellist(data) {
    return request({
        url: `/sys/role/${data.id}`,
        method: 'delete',
        data
    })
}

export function getEnabledRoles(id) {
    return request({
        url: `/sys/role/list/enabled`
    })
}


export function getEmployeeDetail(data) {
    return request({
        url: `/sys/user/${data.id}`,
        method: 'get',
        data
    })
}




export function putEmployeeDetail(data) {
    return request({
        url: `/sys/role/assignPrem`,
        method: 'put',
        data
    })
}
