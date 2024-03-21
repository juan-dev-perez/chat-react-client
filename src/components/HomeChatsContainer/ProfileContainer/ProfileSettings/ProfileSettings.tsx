import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import UpdateProfileModal from "../UpdateProfileModal/UpdateProfileModal";

export default function ProfileSettings() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Button variant="text" color="inherit" onClick={toggleDrawer(true)}>
        <ManageAccountsIcon color="action" fontSize="large" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 350 }}
          role="presentation"
        //   onClick={toggleDrawer(false)}
        //TODO: hacer boton para cerrar el modal
        >
          <UpdateProfileModal />
        </Box>
      </Drawer>
    </>
  );
}
