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
        path: "coursePage/:courseId",
        component: () => import("pages/coursePage.vue"),
      },

      {
        path: "materialPage/:courseId/:assignmentId",
        component: () => import("src/pages/materialPage.vue"),
      },
      {
        path: "settings",
        component: () => import("pages/settingsPage.vue"),
      },
      {
        path: "archivedPage",
        component: () => import("pages/archivedPage.vue"),
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
      {
        path: "testPage",
        component: () => import("pages/testPage.vue"),
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
