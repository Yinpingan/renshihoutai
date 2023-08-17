import Layout from '@/layout'
export default {
    path: '/salary',
    name: "salary",

    component: Layout,
    children: [
        {
            path: "",
            name: "salary1",
            component: () => import('@/views/salary/index'),
            meta: {
                icon: "",
                title: '工资管理'
            }
        }
    ]
}