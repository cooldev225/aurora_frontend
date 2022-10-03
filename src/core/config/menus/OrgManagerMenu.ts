import icons from "@/core/data/icons";
const OrgManagerMenu = [
  {
    heading: "Booking",
    route: "/appointments",
    svgIcon: icons.calender,
    pages: [
      {
        heading: "Dashboard",
        route: "/appointments/dashboard",
      },
      {
        heading: "Unconfirmed Appointments",
        route: "/appointments/unconfirmed-apts",
      },
      {
        heading: "Unapproved Procedures",
        route: "/appointments/unapproved-procedures",
      },
      {
        heading: "Waitlisted Appointments",
        route: "/appointments/waitlisted-apts",
      },
      {
        heading: "Cancellation List",
        route: "/appointments/cancellation-list",
      },
    ],
  },
  {
    heading: "Patients",
    route: "/patients",
    svgIcon: icons.heart_pulse,
  },
  {
    heading: "Billing",
    route: "/billing",
    svgIcon: icons.credit_card,
    pages: [
      {
        heading: "Out of pocket payment",
        route: "/billing/make-payment",
      },
      {
        heading: "3rd Party Billing",
        route: "/billing",
      },
    ],
  },
  {
    heading: "Coding",
    route: "/coding",
    svgIcon: icons.paper,
  },
  {
    heading: "Communication",
    route: "/third-party-comms",
    svgIcon: icons.paper_plane,
    fontIcon: "bi-send",
    pages: [
      {
        heading: "Document Outbox",
        route: "/outbox",
      },
      {
        heading: "Document Inbox",
        route: "/inbox",
      },
      {
        heading: "Patient Recall",
        route: "/recalls",
      },
    ],
  },
  {
    heading: "HRM",
    route: "/human-resource-management",
    svgIcon: icons.person_circle,
  },
];

export default OrgManagerMenu;
