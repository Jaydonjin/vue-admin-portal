import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/views/dashboard/index'
import Login from '@/views/login/index'
import NotFound from '@/views/404'
import Nested from '@/views/nested/menu1/index'
import Nested2 from '@/views/nested/menu2/index'
import NestedSub1 from '@/views/nested/menu1/menu1-1'
import NestedSub2 from '@/views/nested/menu1/menu1-2'
import Permission from '@/views/permission'
import app from 'app/genesis.js'


Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    { path: '/404', component: NotFound, hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            name: 'dashboard',
            meta: {
                title: 'dashboard',
                icon: 'dashboard'
            },
            component: Dashboard,

        }]
    },
    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: 'nested',
            icon: 'nested'
        },
        children: [
            {
                path: 'menu1',
                component: Nested, // Parent router-view
                name: 'Menu1',
                meta: { title: 'menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        component: NestedSub1,
                        name: 'Menu1-1',
                        meta: { title: 'menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: NestedSub2,
                        name: 'Menu1-2',
                        meta: { title: 'menu1-2' },
                    },
                ]
            },
            {
                path: 'menu2',
                component: Nested2, // Parent router-view
                name: 'Menu2',
                meta: { title: 'menu2' }
            }
        ]
    },
]

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap,
    base: app.genesis_prefix
})

export const asyncRouterMap = [{
    path: '/permission',
    component: Layout,
    meta: {
        roles: ['admin']
    },
    children: [{
        path: 'index',
        name: 'permission',
        meta: {
            title: 'permission',
            icon: 'lock',
            roles: ['admin']
        },
        component: Permission,
    }]
},
    { path: '*', redirect: '/404', hidden: true },
]
