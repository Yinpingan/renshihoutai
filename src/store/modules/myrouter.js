
import { constantRoutes } from '@/router/index'

export default {
    namespaced: true,
    state: {
        routes: constantRoutes
    },
    mutations: {
        setroutes(state, routeall) {
            state.routes = [...constantRoutes, ...routeall]
        }
    },
}