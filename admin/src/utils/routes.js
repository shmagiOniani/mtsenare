import {
  Notifications,
  Home,
  Organization,
  OrganizationCard,
  Booking,
  Filial,
  Hardware,
  Users,
  User,
  Products,
  PtiRegistry,
  Invoices,
  Streaming,
  Brakes,
  Exhaust,
  Statistics,
  Role
} from "../pages";

export const privateRoute = [
  {
    component: Notifications,
    path: "/notifications",
    layout: "",
    exact: true,
    permission:"Permissions.Report"
  },
  {
    component: Home,
    path: "/home",
    layout: "",
    exact: false,
    permission: "Permissions.VehicleApplication"
  },
  {
    component: Organization,
    path: "/organization",
    layout: "",
    exact: true,
    permission:"Permissions.Company"
  },
  {
    component: OrganizationCard,
    path: "/organization",
    layout: "/:id",
    exact: true,
    permission:"Permissions.Company"
  },
  {
    component: Booking,
    path: "/booking",
    layout: "",
    exact: true,
    permission:"Permissions.Booking"
  },
  {
    component: Filial,
    path: "/branch",
    layout: "",
    exact: false,
    permission:"Permissions.Branch"
  },
  {
    component: Hardware,
    path: "/hardware",
    layout: "",
    exact: false,
    permission:"Permissions.Machine"
  },
  {
    component: Users,
    path: "/users",
    layout: "",
    exact: true,
    permission:"Permissions.User"
  },
  {
    component: Role,
    path: "/roles",
    layout: "",
    exact: true,
    permission:"Permissions.Roles"
  },
  {
    component: User,
    path: "/users",
    layout: "/:id",
    exact: true,
    permission:"Permissions.User"
  },
  {
    component: Products,
    path: "/products",
    layout: "",
    exact: true,
    permission:"Permissions.VehicleApplication"
  },
  {
    component: PtiRegistry,
    path: "/shops",
    layout: "",
    exact: true,
    permission:"Permissions.VehicleApplication"
  },
  {
    component: Streaming,
    path: "/streaming",
    layout: "",
    exact: true,
    permission:"Permissions.Branch"
  },
  {
    component: Invoices,
    path: "/invoices",
    layout: "",
    exact: true,
    permission:"Permissions.Invoice"
  },
  {
    component: Brakes,
    path: "/brakes",
    layout: "",
    exact: true,
    permission:"Permissions.Brake"
  },
  {
    component: Exhaust,
    path: "/exhaust",
    layout: "",
    exact: true,
    permission:"Permissions.Exhaust"
  },
  {
    component: Statistics,
    path: "/statistics",
    layout: "/:id",
    exact: true,
    permission:"Permissions.Report"
  },
];
