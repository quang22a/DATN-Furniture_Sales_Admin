import NotificationPage from "./Notification";
import NotificationList from "./containers/NotificationList";
import AddNotification from "./containers/AddNotification";
import NotificationDetail from "./containers/NotificationDetail";
import UpdateNotification from "./containers/UpdateNotification";

const notificationRoutes = [
  {
    path: "/notifications",
    element: NotificationPage,
    children: [
      {
        path: "",
        element: NotificationList,
      },
      {
        path: "add-notification",
        element: AddNotification,
      },
      {
        path: ":id/update",
        element: UpdateNotification,
      },
      {
        path: ":id",
        element: NotificationDetail,
      },
    ],
  },
];

export default notificationRoutes;
