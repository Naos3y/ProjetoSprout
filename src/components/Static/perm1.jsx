// import { Icon } from "@iconify/react";

import { SideNavItem } from "../../components/Static/types";

export const SIDENAV_ITEMS_1 = [
  {
    title: "Users",
    path: "/Users",
    // icon: <Icon icon="gridicons:multiple-users" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {
        title: "Search Users",
        path: "/admin/adminhub/Users/searchUsers",
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
        path: "/admin/adminhub/Users/addNewUser",
        // icon: <Icon icon="wpf:add-user" width="17" height="17" />,
      },
      {
        title: "Add New Department",
        path: "/admin/adminhub/Users/addNewDepartment",
        // icon: <Icon icon="ph:briefcase" width="17" height="17" />,
      },
      {
        title: "Add New Team",
        path: "/admin/adminhub/Users/addNewTeam",
        // icon: (
        // <Icon icon="ph:microsoft-teams-logo-fill" width="17" height="17" />
        // ),
      },
      {
        title: "Add New Group",
        path: "/admin/adminhub/Users/addNewGroup",
        // icon: (
        //   <Icon icon="clarity:employee-group-solid" width="17" height="17" />
        // ),
      },
      {
        title: "Associate Inside Teacher",
        path: "/admin/adminhub/Users/associateInsideTeacher",
        // icon: <Icon icon="la:chalkboard-teacher" width="17" height="17" />,
      },
    ],
  },
  {
    title: "Trainings",
    path: "/Trainings",
    // icon: <Icon icon="oui:training" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      {
        title: "Search Trainings",
        path: "/Trainings/searchTrainings",
        // icon: (
        //   <Icon icon="healthicons:magnifying-glass" width="17" height="17" />
        // ),
      },
      {
        title: "Edit Trainings",
        path: "/admin/adminhub/Users/editUsers",
        // icon: <Icon icon="mdi:pencil-outline" width="17" height="17" />,
      },
      {
        title: "Add New Trainings",
        path: "/Trainings/addNewTrainings",
        // icon: <Icon icon="carbon:add-filled" width="17" height="17" />,
      },
      {
        title: "Confirm Training Attendance",
        path: "/Trainings/confirmTrainingAttendance",
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
        path: "/admin/adminhub/TrainingPlans/createNewTrainingTemplate",
        // icon: <Icon icon="gridicons:create" width="17" height="17" />,
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
      // {
      //   title: "Calendar",
      //   path: "/sprout/calendar",
      //   // icon: <Icon icon="mdi:pencil-outline" width="17" height="17" />,
      // },
      {
        title: "My team",
        path: "/sprout/myteam",
        // icon: <Icon icon="mdi:pencil-outline" width="17" height="17" />,
      },
    ],
  },
];
