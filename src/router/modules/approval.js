import Layout from '@/layout'
export default {
    path: '/approval',
    name: "approval",
    component: Layout,
    children: [
        {
            path: "",
            name: "approval1",
            component: () => import('@/views/approval/index'),
            meta: {
                icon: "",
                title: '审批管理'
            }
        }
    ]
}