import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";
import { MyRoutes } from '@/router/index'
NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/404"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // // start progress bar
  NProgress.start();

  // // set page title
  // document.title = getPageTitle(to.meta.title)

  // // determine whether the user has logged in
  // const hasToken = getToken()

  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
  if (store.getters.token) {
    if (to.path == "/login") {
      next("/");
    } else {
      if (!store.getters.userId) {
        let res = await store.dispatch("user/getProfile");
        console.log(res);
        let routerfilter = MyRoutes.filter(item => res.roles.menus.includes(item.name))
        console.log(routerfilter);
        store.commit('myrouter/setroutes', routerfilter)
        router.addRoutes([...routerfilter, { path: '*', redirect: '/404', hidden: true }])
      }
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
