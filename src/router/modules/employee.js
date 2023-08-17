import Layout from '@/layout'
export default {
    path: '/employee',
    name: "employee",

    component: Layout,
    children: [
        {
            path: "",
            name: "employee1",
            component: () => import('@/views/employee/index'),
            meta: {
                icon: "",
                title: '员工管理'
            }
        },
        // {
        //     path: "detail",
        //     name: "detail",
        //     hidden: true,
        //     component: () => import('@/views/employee/detail'),
        //     meta: {
        //         title: '员工详情'
        //     }
        // },
        {
            path: "detail/:id?",
            name: "detail",
            hidden: true,
            component: () => import('@/views/employee/detail'),
            meta: {
                title: '员工详情'
            }
        }
    ]
}