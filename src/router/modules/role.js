import Layout from '@/layout'
export default {
    path: '/role',
    name: "role",

    component: Layout,
    children: [
        {
            path: "",
            name: "role1",
            component: () => import('@/views/role/index'),
            meta: {
                icon: "",
                title: '角色管理'
            }
        }
    ]
}