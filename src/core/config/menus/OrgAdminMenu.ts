import icons from "@/core/data/icons";
const OrgAdminMenu = [
  {
    heading: "Clinics",
    route: "/clinics",
    svgIcon: icons.location_house,
    fontIcon: "bi-hospital",
  },
  {
    heading: "HRM",
    route: "/hrm",
    svgIcon: icons.person_circle,
    fontIcon: "bi-people",
    pages: [
      {
        heading: "Weekly Schedule Template",
        route: "/hrm/weekly-schedule-template",
      },
      {
        heading: "Weekly Schedule",
        route: "/hrm/weekly-schedule",
      },
      {
        heading: "All Employees",
        route: "/employees",
      },
      {
        heading: "Administrators",
        route: "/organisationAdmins",
      },
    ],
  },
  {
    heading: "Settings",
    route: "/settings",
    svgIcon: icons.gear,
  },
  {
    heading: "Organization",
    route: "/organization",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-hospital",
  },
];

export default OrgAdminMenu;
