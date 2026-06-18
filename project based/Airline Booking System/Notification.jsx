import { useApp } from "../context/AppContext";

export default function Notification() {
  const { notification } = useApp();
  if (!notification) return null;

  const color = notification.type === "success" ? "success" : "danger";

  return (
    <div className={`alert alert-${color} alert-dismissible position-fixed top-0 start-50 translate-middle-x mt-2`}
      style={{ zIndex: 9999, minWidth: "300px" }}>
      {notification.msg}
    </div>
  );
}
