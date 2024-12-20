const routes = [
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "enrolledCourses",
        component: () => import("pages/enrolledCourses.vue"),
      },
      {
        path: "coursePage",
        component: () => import("pages/coursePage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/SecondLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/loginPage.vue"),
      },
      {
        path: "registerPage",
        component: () => import("pages/registerPage.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
