import Snackbar from "@mui/material/Snackbar";
import { useChat } from "../../context/useChat";
import Alert from "@mui/material/Alert";

export default function Notification() {
  const {
    showNotification,
    successNotification,
    messageNotification,
    closeNotification,
  } = useChat();

  return (
    <Snackbar
      open={showNotification}
      autoHideDuration={3000}
      onClose={closeNotification}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        severity={successNotification ? "success" : "error"}
        variant="filled"
        sx={{ width: "300px" }}
      >
        {messageNotification}
      </Alert>
    </Snackbar>
  );
}
