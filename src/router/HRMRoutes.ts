const HRMRoutes = [
  {
    path: "/employees",
    name: "employees",
    component: () => import("@/views/employees/Employee.vue"),
  },
  {
    path: "/employees/create",
    name: "employees-create",
    component: () => import("@/views/employees/EditEmployee.vue"),
  },
  {
    path: "/employees/edit/:id",
    name: "employees-edit",
    component: () => import("@/views/employees/EditEmployee.vue"),
  },
  {
    path: "/hrm/weekly-schedule",
    name: "hrm-weekly-schedule",
    component: () => import("@/views/HRM/WeeklySchedule.vue"),
  },
  {
    path: "/hrm/weekly-schedule-template",
    name: "hrm-weekly-schedule-template",
    component: () => import("@/views/HRM/WeeklyScheduleTemplate.vue"),
  },
  {
    path: "/hrm/bulletin-board",
    name: "bulletin-board",
    component: () => import("@/views/HRM/BulletinBoard.vue"),
  },
  {
    path: "/hrm/bulletin-manage",
    name: "bulletin-manage",
    component: () => import("@/views/HRM/BulletinManage.vue"),
  },
];

export default HRMRoutes;
