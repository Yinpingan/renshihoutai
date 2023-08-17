import request from "@/utils/request";


export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

export function getEmployee(data) {
  return request({
    url: '/sys/user/' + data.id,
  })
}
export function putEmployee(data) {
  return request({
    url: '/sys/user/' + data.id,
    method: 'put',
    data
  })
}

export function exportEmployee() {
  return request({
    url: `/sys/user/export`,
    responseType: 'blob',
  })
}
export function exportExcole() {
  return request({
    url: `/sys/user/import/template`,
    responseType: 'blob',
  })
}


export function importEmployee(data) {
  return request({
    url: `sys/user/import`,
    method: 'POST',
    data
  })
}
export function assignRole(data) {
  return request({
    url: `/sys/user/assignRoles`,
    method: "PUT",
    data
  })
}