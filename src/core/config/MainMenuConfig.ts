const AdminMenu = [
  {
    heading: "Dashboard",
    route: "/dashboard",
    svgIcon: "media/icons/duotune/art/art002.svg",
    fontIcon: "bi-house fs-2",
  },
  {
    heading: "Organizations",
    route: "/organizations",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-hospital",
  },
  {
    heading: "Administrators",
    route: "/admins",
    svgIcon: "media/icons/duotune/communication/com014.svg",
    fontIcon: "bi-person",
  },
  {
    heading: "Settings",
    route: "/settings",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-gear",
    pages: [
      {
        heading: "Health Fund List",
        route: "/settings/health-fund",
        svgIcon: "media/icons/duotune/general/gen022.svg",
        fontIcon: "bi-archive",
      },
      {
        heading: "Birthcode List",
        route: "/settings/birthCode",
        svgIcon: "media/icons/duotune/communication/com006.svg",
        fontIcon: "bi-person",
      },
      {
        heading: "Specialist Type",
        route: "/settings/specialist-type",
        svgIcon: "media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-sticky",
      },
      {
        heading: "Specialist Title",
        route: "/settings/specialist-title",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
      },
    ],
  },
];

const OrgAdminMenu = [
  {
    heading: "Dashboard",
    route: "/dashboard",
    svgIcon: "media/icons/duotune/art/art002.svg",
    fontIcon: "bi-house fs-2",
  },
  {
    heading: "Clinics",
    route: "/clinics",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-hospital",
  },
  {
    heading: "Administrators",
    route: "/organizationAdmins",
    svgIcon: "media/icons/duotune/communication/com014.svg",
    fontIcon: "bi-person",
  },
  {
    heading: "Managers",
    route: "/organizationManagers",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-hospital",
  },

  {
    heading: "Employees",
    route: "/employees",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-hospital",
  },
];

const OrgManagerMenu = [
  {
    heading: "Switch Clinic",
    route: "/switch-clinic",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Mailbox",
    route: "/mailbox",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Booking",
    route: "/booking",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-file-text",
    pages: [
      {
        heading: "Dashboard",
        route: "/booking/dashboard",
        svgIcon: "media/icons/duotune/general/gen022.svg",
        fontIcon: "bi-archive",
      },
      {
        heading: "Uniconfirmed Appointments",
        route: "/booking/uniconfirmed-appointments",
        svgIcon: "media/icons/duotune/communication/com006.svg",
        fontIcon: "bi-person",
      },
      {
        heading: "Waitlisted Appointments",
        route: "/booking/waitlisted-appointments",
        svgIcon: "media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-sticky",
      },
      {
        heading: "Cancellation List",
        route: "/booking/cancellation-list",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
      },
      {
        heading: "Draft Appointments",
        route: "/booking/draft-appointments",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
      },
      {
        heading: "Patient Recall",
        route: "/bookings/patient-recall",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
      },
    ],
  },
  {
    heading: "Patients",
    route: "/patients",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Check in",
    route: "/checkin",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Billing",
    route: "/billing",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Make Payment",
    route: "/make-payment",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-layers",
  },
  {
    heading: "Third Party Comms",
    route: "/third-party-comms",
    svgIcon: "media/icons/duotune/general/gen019.svg",
    fontIcon: "bi-file-text",
    pages: [
      {
        heading: "Sending Report",
        route: "/thid-party-comms/sending-report",
        svgIcon: "media/icons/duotune/general/gen022.svg",
        fontIcon: "bi-archive",
      },
      {
        heading: "HL7 Send History",
        route: "/third-party-comms/hl7-send-history",
        svgIcon: "media/icons/duotune/communication/com006.svg",
        fontIcon: "bi-person",
      },
      {
        heading: "Patients Results Inbox",
        route: "/third-party-comms/patients-results-inbox",
        svgIcon: "media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-sticky",
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

const ReceptionistMenu = [
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

const SpecialistMenu = [
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

const PathologistMenu = [
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

const ScientistMenu = [
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

const TypistMenu = [
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

const AnesthetistMenu = [
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
