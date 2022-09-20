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
];

export default HRMRoutes;
