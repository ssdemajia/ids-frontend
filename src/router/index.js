import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    name: '主界面',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        // name: 'dashboard',
        meta: { title: '主界面', icon: 'example', noCache: true }
      }
    ]
  },
  // {
  //   path: '/dashboard',
  //   component: Layout,
  //   // redirect: '/dashboard',
  //   name: '主界面',
  //   component: () => import('@/views/dashboard/index'),
  //   meta: { title: '主界面', icon: 'example', noCache: true }
  // },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  {
    path: '/events',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/events/index'),
        meta: { title: '入侵事件', icon: 'eye' }
      },
      {
        hidden: true,
        path: 'event/:id',
        component: () => import('@/views/events/event')
      }
    ]
  },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/upload',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'upload',
        component: () => import('@/views/upload/index'),
        meta: { title: '协议识别', icon: 'form' }
      }
    ]
  },
  {
    path: '/watch',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'watch',
        component: () => import('@/views/watch/index'),
        meta: { title: '流量监控', icon: 'star' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  linkActiveClass: 'active',
  routes: constantRouterMap
})

