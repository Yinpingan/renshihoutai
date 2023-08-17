import request from "@/utils/request";




export function getDepartment() {
    return request({
        url: "/company/department",
        method: "get",
    });
}
export function getDepartment1() {
    return request({
        url: "/sys/permission",
        method: "get",
    });
}

export function getmanagerlist() {
    return request({
        url: "/sys/user/simple",
        method: "get",
    });
}

export function getadd(data) {
    return request({
        url: "/company/department",
        method: "post",
        data
    });
}





export function putedit(data) {
    return request({
        url: "/company/department/" + data.id,
        method: "put",
        data
    });
}




export function deteledel(data) {
    return request({
        url: "/company/department/" + data.id,
        method: "DELETE",
        data
    });
}