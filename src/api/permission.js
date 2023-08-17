
import request from "@/utils/request";




export function postpermission(data) {
    return request({
        url: "/sys/permission",
        method: "post",
        data
    });
}

export function delpermission(data) {
    return request({
        url: "/sys/permission/" + data.id,
        method: "delete",
        data
    });
}
export function getpermission(data) {
    return request({
        url: "/sys/permission/" + data.id,
        method: "get",
        data
    });
}

export function putpermission(data) {
    return request({
        url: "/sys/permission/" + data.id,
        method: "put",
        data
    });
}