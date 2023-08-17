import Layout from '@/layout'
export default {
    path: '/attendance',
    name: "attendance",
    component: Layout,
    children: [
        {
            path: "",
            name: "attendance1",
            component: () => import('@/views/attendance/index'),
            meta: {
                icon: "",
                title: '考勤管理'
            }
        }
    ]
}