import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
// import NotFoundComponent from "./views/NotFound";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history", //一定要是history模式
    routes: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/about",
        name: "about",
        component: () =>
          import(/* webpackChunkName: "about" */ "./views/About.vue")
      },
      {
        path: "/userList",
        name: "userList",
        component: () =>
          import(/* webpackChunkName: "about" */ "./views/UserList.vue")
      },
      // { path: "*", component: NotFoundComponent }
    ]
  });
}
