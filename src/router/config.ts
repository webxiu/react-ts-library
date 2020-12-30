/**
 * 路由表, 都去掉了/admin路由, 如首页: /admin/home ...
 */
const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: 'desktop'
    },
    {
        title: '组件',
        key: '/ui',
        icon: 'pie-chart',
        children: [
            {
                title: '生命周期',
                key: '/ui/button',
                icon: 'appstore'
            },
            {
                title: 'context属性传递',
                key: '/ui/context',
                icon: 'appstore'
            },
            {
                title: '轮播',
                key: '/ui/banner',
                icon: 'desktop'
            },
            {
                title: '上传',
                key: '/ui/upload',
                icon: 'appstore'
            },
            {
                title: '放大镜',
                key: '/ui/scale',
                icon: 'appstore'
            },
        ]
    },
    {
        title: '系统设置',
        key: '/setting',
        icon: 'mail',
        children: [
            {
                title: '添加用户',
                key: '/setting/add',
                icon: 'mail'
            },
            {
                title: '面板',
                key: '/setting/card',
                icon: 'desktop'
            },
           
        ]
    },
    {
        title: '黑客帝国',
        key: '/hacker',
        icon: 'mail'
    },
    {
        title: '表格数据',
        key: '/table',
        icon: 'mail'
    },
    {
        title: '表单数据',
        key: '/form',
        icon: 'inbox'
    },
    {
        title: '权限设置',
        key: '/permission',
        icon: 'inbox'
    },
    {
        title: '角色管理',
        key: '/role',
        icon: 'inbox'
    },
    {
        title: '消息列表',
        key: '/notice',
        icon: 'desktop'
    },

]

export default menuList