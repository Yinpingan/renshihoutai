import Layout from '@/layout'
export default {
    path: '/social',
    name: "social",
    component: Layout,
    children: [
        {
            path: "",
            name: "social1",
            component: () => import('@/views/social/index'),
            meta: {
                icon: "",
                title: '社保管理'
            }
        }
    ]
}