import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)
import Layout from '@/layout'

const useComponent = component => () => import(`@/views/${component}`);

export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        hidden: false,
        children: [{
            path: 'home',
            component: useComponent("Home"),
            name: 'home',
            meta: { title: '首页', enTitle: 'home', icon: 'component', affix: false }
        }]
    },
]

export function newRouterList(data) {
    var permissionRoutes = []
    data.forEach(route => {
        var temproute = {
            path: '/' + route.ModuleCode,
            component: Layout,
            children: []
        }
        if (route.Childrens == null || route.Childrens.length == 0) {
            let children = [{
                ModuleCode: 'index',
                IconClass: route.IconClass,
                ChildrenName: route.ChildrenName,
                ChildrenEnName: route.ChildrenEnName,
                PermCode: route.PermCode,
                PermFlag: route.PermFlag,
                Childrens: null
            }]
            let childrouter = newChildRouter(children, route.ModuleCode)
            temproute.meta = {
                title: route.ChildrenName,
                enTitle: route.ChildrenEnName,
                icon: route.IconClass
            }
            //temproute.name=route.ChildrenName
            temproute.children = childrouter
        } else {
            if (route.PermFlag) {
                store.dispatch('permission/setRerm', {
                    code: route.PermCode,
                    flag: route.PermFlag
                })
            }
            let childrouters = newChildRouter(route.Childrens, route.ModuleCode)
            temproute.meta = {
                title: route.ChildrenName,
                enTitle: route.ChildrenEnName,
                icon: route.IconClass
            }
            temproute.name = route.ModuleCode
            temproute.children = childrouters
            temproute.redirect = 'noRedirect'
        }
        permissionRoutes.push(temproute)
    })
    return permissionRoutes
}

export function newChildRouter(data, path) {
    if (data == null) {
        return null
    }
    var childrens = []
    data.forEach(children => {
        var router = {
            path: children.ModuleCode,
            component: () => {
                if (path) {
                    return import('@/views/' + path + '/' + children.ModuleCode + '.vue')
                } else {
                    return import('@/views/' + children.ModuleCode + '/index.vue')
                }
            },
            name: children.ModuleCode,
            meta: {
                title: children.ChildrenName,
                enTitle: children.ChildrenEnName,
                icon: children.IconClass
            }
        }
        var tempchildrens = newChildRouter(children.Childrens, path)
        if (tempchildrens != null) {
            router.children = tempchildrens
        }
        childrens.push(router)
    })
    return childrens
}

const createRouter = () =>
    new Router({
        scrollBehavior: (to, from, savedPosition) => {
            if (savedPosition) {
                return savedPosition
            } else {
                return {
                    x: 0,
                    y: 0
                }
            }
        },
        routes: constantRoutes
    })

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router