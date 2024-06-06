// import { Icon } from "@iconify/react";

import { SideNavItem } from "@/components/Static/types";

export const SIDENAV_ITEMS_4 = [
  {
    title: "Sprout",
    path: "/sprout",
    // icon: <Icon icon="solar:clipboard-list-linear" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {
        title: "Catalog",
        path: "/sprout",
        // icon: <Icon icon="codicon:debug-start" width="17" height="17" />,
      },
      {
        title: "My trainings",
        path: "/sprout/mytrainings",
        // icon: (
        //   <Icon icon="healthicons:magnifying-glass" width="17" height="17" />
        // ),
      },
      {
        title: "Calendar",
        path: "/sprout/calendar",
        // icon: <Icon icon="mdi:pencil-outline" width="17" height="17" />,
      },
      {
        title: "My team",
        path: "/sprout/myteam",
        // icon: <Icon icon="mdi:pencil-outline" width="17" height="17" />,
      },
    ],
  },
];
