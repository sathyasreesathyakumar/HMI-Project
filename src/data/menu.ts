import {
  FaIndustry,
  FaHandPaper,
  FaBoxes,
  FaTools,
  FaBell,
  FaCog,
} from "react-icons/fa";

import { ROUTES } from "../constants/routes";
import { ROLES } from "../constants/roles";

export const menuItems = [
  {
    title: "Machine",
    icon: FaIndustry,
    route: ROUTES.MACHINE,
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.OPERATOR],
  },
  {
    title: "Manual",
    icon: FaHandPaper,
    route: "#",
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.OPERATOR],
  },
  {
    title: "Selection",
    icon: FaBoxes,
    route: "#",
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.OPERATOR],
  },
  {
    title: "Utilities",
    icon: FaTools,
    route: "#",
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.OPERATOR],
  },
  {
    title: "Alarm",
    icon: FaBell,
    route: "#",
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.OPERATOR],
  },
  {
    title: "Settings",
    icon: FaCog,
    route: ROUTES.SETTINGS,
    roles: [ROLES.ADMIN, ROLES.MANAGER],
  },
];