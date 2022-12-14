// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
// 引入组件
import About from "../pages/About";
import Home from "../pages/Home";
import News from "../pages/News";
import Message from "../pages/Message";
import Detail from "../pages/Detail";

// 创建并暴露一个路由器
const router = new VueRouter({
  routes: [
    {
      name: "guanyu",
      path: "/about",
      component: About,
    },
    {
      name: "主页",
      path: "/home",
      component: Home,
      children: [
        {
          name: "新闻",
          path: "news",
          component: News,
        },
        {
          name: "xiaoxi",
          path: "message",
          component: Message,
          children: [
            {
              name: "xiangqing",
              path: "detail",
              component: Detail,
              // props的第一种写法，值为对象，该对象中的所有key-value都会以props的形式传给Detail组件。
              // props: { a: 1, b: "hello" },

              // 第二种写法，值为布尔值,若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传给Detail组件。
              // props: true,

              // 第三种写法，值为函数
              /* props: function ($route) {
                return {
                  id: $route.query.id,
                  title: $route.query.title,
                };
              }, */
              /* props({ query }) {
                return {
                  id: query.id,
                  title: query.title,
                };
              }, */
              props({ query: { id, title } }) {
                return {
                  id,
                  title,
                };
              },
            },
          ],
        },
      ],
    },
  ],
});
// 全局前置路由守卫
// 每一次路由跳转之前或初始化的时候，调用一个函数。
router.beforeEach((to, from, next) => {
  console.log(to, from);
  // if (to.name === "/home/news" || to.path === "/home/message")
  if (to.path === "/home/news" || to.path === "/home/message") {
    if (localStorage.getItem("school") === "atguigu") {
      next();
    } else {
      alert("学校名不对,无权限查看");
    }
  } else {
    next();
  }
});

export default router;
