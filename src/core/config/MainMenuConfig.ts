const DocMenuConfig = [
  // {
  //   heading: "Dashboard",
  //   route: "/dashboard",
  //   svgIcon: "media/icons/duotune/art/art002.svg",
  //   fontIcon: "bi-house fs-2",
  // },
  {
    heading: "Administrators",
    role: ["admin", "org_admin"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Organizations",
    role: ["admin", "org_admin"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Switch Clinic",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Mailbox",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Patient",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Check in",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Billing",
    role: ["admin", "org_admin"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Make Payment",
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Third Party Comms",
    route: "/crafted",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-file-text",
    pages: [
      {
        heading: "Sending Report",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/general/gen022.svg",
        fontIcon: "bi-archive",
      },
      {
        heading: "HL7 Send History",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/communication/com006.svg",
        fontIcon: "bi-person",
      },
      {
        heading: "Patients Results Inbox",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-sticky",
      },
      {
        heading: "Specialist Title",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
      },
    ],
  },
  {
    heading: "Settings",
    route: "/crafted",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-file-text",
    pages: [
      {
        heading: "Health Fund List",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/general/gen022.svg",
        fontIcon: "bi-archive",
      },
      {
        heading: "Birthcode List",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/communication/com006.svg",
        fontIcon: "bi-person",
      },
      {
        heading: "Specialist Type",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-sticky",
      },
      {
        heading: "Specialist Title",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
      },
    ],
  },
  {
    heading: "HRM (Admin)",
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "HRM (Empolyee)",
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "apps",
    route: "/apps",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-window-stack",
    pages: [
      {
        heading: "customers",
        route: "/apps/customers/getting-started",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "subscriptions",
        route: "/apps/customers/getting-started",
        svgIcon: "media/icons/duotune/ecommerce/ecm002.svg",
        fontIcon: "bi-cart",
      },
      {
        heading: "chat",
        route: "/apps/customers/getting-started",
        svgIcon: "media/icons/duotune/communication/com012.svg",
        fontIcon: "bi-chat-left",
      },
    ],
  },
];

export const OrgAdminMenu = [
  {
    heading: "Administrators",
    route: "/admins",
    svgIcon: "media/icons/duotune/communication/com014.svg",
    fontIcon: "bi-person",
  },
  {
    heading: "Organizations",
    route: "/organizations",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-hospital",
  },
  {
    heading: "Settings",
    route: "/crafted",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-gear",
    pages: [
      {
        heading: "Health Fund List",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/general/gen022.svg",
        fontIcon: "bi-archive",
      },
      {
        heading: "Birthcode List",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/communication/com006.svg",
        fontIcon: "bi-person",
      },
      {
        heading: "Specialist Type",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-sticky",
      },
      {
        heading: "Specialist Title",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
      },
    ],
  },
];

export const OrgManagerMenu = [
  {
    heading: "Switch Clinic",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Mailbox",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Booking",
    route: "/crafted",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-file-text",
    pages: [
      {
        heading: "Dashboard",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/general/gen022.svg",
        fontIcon: "bi-archive",
      },
      {
        heading: "Uniconfirmed Appointments",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/communication/com006.svg",
        fontIcon: "bi-person",
      },
      {
        heading: "Waitlisted Appointments",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-sticky",
      },
      {
        heading: "Cancellation List",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
      },
      {
        heading: "Draft Appointments",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
      },
      {
        heading: "Patient Recall",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
      },
    ],
  },
  {
    heading: "Patient",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Check in",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Billing",
    role: ["admin", "org_admin"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Make Payment",
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Third Party Comms",
    route: "/crafted",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-file-text",
    pages: [
      {
        heading: "Sending Report",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/general/gen022.svg",
        fontIcon: "bi-archive",
      },
      {
        heading: "HL7 Send History",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/communication/com006.svg",
        fontIcon: "bi-person",
      },
      {
        heading: "Patients Results Inbox",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-sticky",
      },
      {
        heading: "Specialist Title",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
      },
    ],
  },
  {
    heading: "HRM (Admin)",
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
];

export const ReceptionistMenu = [
  {
    heading: "Switch Clinic",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Mailbox",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Booking",
    route: "/crafted",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-file-text",
    pages: [
      {
        heading: "Dashboard",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/general/gen022.svg",
        fontIcon: "bi-archive",
      },
      {
        heading: "Uniconfirmed Appointments",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/communication/com006.svg",
        fontIcon: "bi-person",
      },
      {
        heading: "Waitlisted Appointments",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-sticky",
      },
      {
        heading: "Cancellation List",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
      },
      {
        heading: "Draft Appointments",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
      },
      {
        heading: "Patient Recall",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
      },
    ],
  },
  {
    heading: "Patient",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Check in",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Billing",
    role: ["admin", "org_admin"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Make Payment",
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Third Party Comms",
    route: "/crafted",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-file-text",
    pages: [
      {
        heading: "Sending Report",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/general/gen022.svg",
        fontIcon: "bi-archive",
      },
      {
        heading: "HL7 Send History",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/communication/com006.svg",
        fontIcon: "bi-person",
      },
      {
        heading: "Patients Results Inbox",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-sticky",
      },
      {
        heading: "Specialist Title",
        route: "/crafted/pages/profile/overview",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
      },
    ],
  },
  {
    heading: "HRM (Employee)",
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
];

export const SpecialistMenu = [
  {
    heading: "Dashboard",
    route: "/dashboard",
    svgIcon: "media/icons/duotune/art/art002.svg",
    fontIcon: "bi-house fs-2",
  },
  {
    heading: "Mailbox",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "My Bookings",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "HRM (Employee)",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
];

export const PathologistMenu = [
  {
    heading: "Dashboard",
    route: "/dashboard",
    svgIcon: "media/icons/duotune/art/art002.svg",
    fontIcon: "bi-house fs-2",
  },
  {
    heading: "Mailbox",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Pathologist Dashbaord",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Report Section",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "HRM (Employee)",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
];

export const ScientistMenu = [
  {
    heading: "Dashboard",
    route: "/dashboard",
    svgIcon: "media/icons/duotune/art/art002.svg",
    fontIcon: "bi-house fs-2",
  },
  {
    heading: "Mailbox",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Scientist Dashboard",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Report Section",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "HRM (Employee)",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
];

export const TypistMenu = [
  {
    heading: "Dashboard",
    route: "/dashboard",
    svgIcon: "media/icons/duotune/art/art002.svg",
    fontIcon: "bi-house fs-2",
  },
  {
    heading: "Mailbox",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Typist Dashboard",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Letters",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "HRM (Employee)",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
];

export const AnesthetistMenu = [
  {
    heading: "Dashboard",
    route: "/dashboard",
    svgIcon: "media/icons/duotune/art/art002.svg",
    fontIcon: "bi-house fs-2",
  },
  {
    heading: "Mailbox",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "My Bookings",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "HRM (Employee)",
    role: ["admin", "org_manager"],
    route: "/builder",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
];

export default DocMenuConfig;
