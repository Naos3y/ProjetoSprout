// import { Icon } from "@iconify/react";

import { SideNavItem } from "@/components/Static/types";

export const SIDENAV_ITEMS_0 = [
  {
    title: "Users",
    path: "/Users",
    // icon: <Icon icon="gridicons:multiple-users" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {
        title: "Search Users",
        path: "/Users/searchUsers",
        // icon: (
        //   <Icon icon="healthicons:magnifying-glass" width="17" height="17" />
        // ),
      },
      {
        title: "Edit Users",
        path: "/Users/editUsers",
        // icon: <Icon icon="mdi:pencil-outline" width="17" height="17" />,
      },
      {
        title: "Add New User",
        path: "/Users/addNewUser",
        // icon: <Icon icon="wpf:add-user" width="17" height="17" />,
      },
      {
        title: "Add New Department",
        path: "/Users/addNewDepartment",
        // icon: <Icon icon="ph:briefcase" width="17" height="17" />,
      },
      {
        title: "Add New Team",
        path: "/Users/addNewTeam",
        // icon: (
        // <Icon icon="ph:microsoft-teams-logo-fill" width="17" height="17" />
        // ),
      },
      {
        title: "Add New Group",
        path: "/Users/addNewGroup",
        // icon: (
        //   <Icon icon="clarity:employee-group-solid" width="17" height="17" />
        // ),
      },
      {
        title: "Associate Inside Teacher",
        path: "/Users/associateInsideTeacher",
        // icon: <Icon icon="la:chalkboard-teacher" width="17" height="17" />,
      },
    ],
  },
  {
    title: "Trainings",
    path: "/admin/adminhub/trainings",
    // icon: <Icon icon="oui:training" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {
        title: "All Trainings",
        path: "/admin/adminhub/trainings/startInside",
        // icon: (
        //   <Icon icon="healthicons:magnifying-glass" width="17" height="17" />
        // ),
      },
      {
        title: "Add New Trainings",
        path: "/admin/adminhub/trainings/add",
        // icon: <Icon icon="carbon:add-filled" width="17" height="17" />,
      },
    ],
  },
  {
    title: "Training Plans",
    path: "/TrainingPlans",
    // icon: <Icon icon="solar:clipboard-list-linear" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {
        title: "Initiate Training Plans",
        path: "/TrainingPlans/initiateTrainingPlan",
        // icon: <Icon icon="codicon:debug-start" width="17" height="17" />,
      },
      {
        title: "Search Training Plans",
        path: "/TrainingPlans/searchTrainingPlan",
        // icon: (
        //   <Icon icon="healthicons:magnifying-glass" width="17" height="17" />
        // ),
      },
      {
        title: "Edit Training Plan",
        path: "/TrainingPlans/editTrainingPlan",
        // icon: <Icon icon="mdi:pencil-outline" width="17" height="17" />,
      },
      {
        title: "Edit Training Plan Template",
        path: "/TrainingPlans/editTrainingPlanTemplate",
        // icon: <Icon icon="mdi:pencil-outline" width="17" height="17" />,
      },
      {
        title: "Create New Training Plan",
        path: "/TrainingPlans/createNewTrainingPlan",
        // icon: (
        //   <Icon icon="material-symbols-light:post-add" width="17" height="17" />
        // ),
      },
      {
        title: "Create New Training Template",
        path: "/TrainingPlans/createNewTrainingTemplate",
        // icon: <Icon icon="gridicons:create" width="17" height="17" />,
      },
    ],
  },
  {
    title: "Manager",
    path: "/manager",
    // icon: <Icon icon="solar:clipboard-list-linear" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {
        title: "My team",
        path: "/manager",
        // icon: <Icon icon="codicon:debug-start" width="17" height="17" />,
      },
      {
        title: "Trainings requests",
        path: "/manager/TrainingRequests",
        // icon: (
        //   <Icon icon="healthicons:magnifying-glass" width="17" height="17" />
        // ),
      },
      {
        title: "Associate to trainings",
        path: "/manager/AddToTraining",
        // icon: <Icon icon="mdi:pencil-outline" width="17" height="17" />,
      },
    ],
  },
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
