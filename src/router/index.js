import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/chat/:userId",
    name: "chat",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () =>
        import(/* webpackChunkName: "chat" */ "../views/ChatScreen.vue"),
      drawer: () =>
        import(/* webpackChunkName: "chat" */ "../components/Drawer.vue")
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
