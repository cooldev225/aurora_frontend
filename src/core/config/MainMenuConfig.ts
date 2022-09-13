const AdminMenu = [
  {
    heading: "Organisations",
    route: "/organisations",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-hospital",
  },
  {
    heading: "Administrators",
    route: "/admins",
    svgIcon: "media/icons/duotune/communication/com006.svg",
    fontIcon: "bi-person",
  },
  {
    heading: "Settings",
    route: "/settings",
    svgIcon: "media/icons/duotune/coding/cod001.svg",
    fontIcon: "bi-gear",
    pages: [
      {
        heading: "Health Fund List",
        route: "/settings/health-fund",
        svgIcon: "media/icons/duotune/general/gen022.svg",
        fontIcon: "bi-archive",
      },
      {
        heading: "BirthCode List",
        route: "/settings/birthCode",
        svgIcon: "media/icons/duotune/communication/com006.svg",
        fontIcon: "bi-person",
      },
    ],
  },
];

const OrgAdminMenu = [
  {
    heading: "Clinics",
    route: "/clinics",
    svgIcon: "media/icons/duotune/maps/map008.svg",
    fontIcon: "bi-hospital",
  },
  {
    heading: "Employees",
    route: "/employees",
    svgIcon: "media/icons/duotune/communication/com006.svg",
    fontIcon: "bi-people",
    pages: [
      {
        heading: "All Employees",
        route: "/employees",
      },
      {
        heading: "Administrators",
        route: "/organisationAdmins",
      },
      {
        heading: "Managers",
        route: "/organisationManagers",
      },
    ],
  },
  {
    heading: "Settings",
    route: "/settings",
    svgIcon: "media/icons/duotune/coding/cod001.svg",
    fontIcon: "bi-gear",
  },
  {
    heading: "Organization",
    route: "/Organization",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-hospital",
  },
];

const OrgManagerMenu = [
  {
    heading: "Booking",
    route: "/appointments",
    svgIcon: "media/icons/duotune/general/gen014.svg",
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
    svgIcon: "media/icons/duotune/medicine/med001.svg",
    fontIcon: "bi-clipboard2-pulse",
  },
  {
    heading: "Billing",
    route: "/billing",
    svgIcon: "media/icons/duotune/finance/fin002.svg",
    fontIcon: "bi-receipt",
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
    heading: "Communication",
    route: "/third-party-comms",
    svgIcon: "media/icons/duotune/general/gen016.svg",
    fontIcon: "bi-send",
    pages: [
      {
        heading: "Document Outbox",
        route: "/thid-party-comms/sending-report",
      },
      {
        heading: "Document Inbox",
        route: "/third-party-comms/patient-result-inbox",
      },
      {
        heading: "Patient Recall",
        route: "/bookings/patient-recall",
      },
    ],
  },
  {
    heading: "HRM",
    route: "/human-resource-management",
    svgIcon: "media/icons/duotune/communication/com006.svg",
    fontIcon: "bi-people",
  },
];

const ReceptionistMenu = [
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
    heading: "HRM",
    route: "/human-resource-management",
    svgIcon: "media/icons/duotune/communication/com006.svg",
    fontIcon: "bi-layers",
  },
];

const SpecialistMenu = [
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
  },
  {
    heading: "Patients",
    route: "/patients",
    svgIcon: "media/icons/duotune/medicine/med001.svg",
    fontIcon: "bi-clipboard2-pulse",
  },
];

const PathologistMenu = [
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
    heading: "HRM",
    role: ["admin", "org_manager"],
    route: "/human-resource-management",
    svgIcon: "media/icons/duotune/communication/com006.svg",
    fontIcon: "bi-layers",
  },
];

const ScientistMenu = [
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
    heading: "HRM",
    role: ["admin", "org_manager"],
    route: "/human-resource-management",
    svgIcon: "media/icons/duotune/communication/com006.svg",
    fontIcon: "bi-layers",
  },
];

const TypistMenu = [
  {
    heading: "Dashboard",
    route: "/dashboard",
    svgIcon: "media/icons/duotune/art/art002.svg",
    fontIcon: "bi-house fs-2",
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
    heading: "HRM",
    role: ["admin", "org_manager"],
    route: "/human-resource-management",
    svgIcon: "media/icons/duotune/communication/com006.svg",
    fontIcon: "bi-layers",
  },
];

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
  },
];

const MainMenuConfig = {
  admin: AdminMenu,
  organizationAdmin: OrgAdminMenu,
  organizationManager: OrgManagerMenu,
  receptionist: ReceptionistMenu,
  specialist: SpecialistMenu,
  pathologist: PathologistMenu,
  scientist: ScientistMenu,
  typist: TypistMenu,
  anesthetist: AnesthetistMenu,
};

export default MainMenuConfig;
