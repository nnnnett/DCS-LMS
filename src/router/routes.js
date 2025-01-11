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
        path: "materialPage/:courseId/:materialId",
        component: () => import("src/pages/materialPage.vue"),
      },
      {
        path: "settings",
        component: () => import("pages/settingsPage.vue"),
      },
      {
        path: "report",
        component: () => import("pages/reportPage.vue"),
      },
      {
        path: "viewReport/:courseId",
        component: () => import("pages/viewReportPage.vue"),
      },
      {
        path: "archivedPage",
        component: () => import("pages/archivedPage.vue"),
      },
      {
        path: "userManagementPage",
        component: () => import("pages/userManagementPage.vue"),
      },
      {
        path: "courseManagementPage",
        component: () => import("pages/courseManagementPage.vue"),
      },
      {
        path: "quizPage/:courseId",
        component: () => import("src/pages/quizPage.vue"),
      },
      {
        path: "answerQuizPage/:courseId/:quizId",
        component: () => import("src/pages/answerQuizPage.vue"),
      },
      {
        path: "studentGrade/:courseId/:studentId",
        component: () => import("src/pages/studentGrade.vue"),
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
