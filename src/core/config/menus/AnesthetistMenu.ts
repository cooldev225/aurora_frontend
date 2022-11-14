// import icons from "@/core/data/icons";

const AnesthetistMenu = [
  {
    heading: "Dashboard",
    route: "/anesthetist-dashboard",
    svgIcon: "media/icons/duotune/art/art002.svg",
    fontIcon: "bi-house fs-2",
  },
  {
    heading: "Bookings",
    route: "/employee-booking-dashboard",
    svgIcon: "media/icons/duotune/general/gen014.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "HRM",
    role: ["admin", "org_manager"],
    route: "/human-resource-management",
    svgIcon: "media/icons/duotune/communication/com006.svg",
    fontIcon: "bi-layers",
    pages: [
      {
        heading: "Bulletin Board",
        route: "/hrm/bulletin-board",
      },
      {
        heading: "My Schedule",
        route: "/hrm/my-schedule",
      },
    ],
  },
];

export default AnesthetistMenu;
