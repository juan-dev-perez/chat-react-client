import ListItem from "@mui/material/ListItem";
import { useChat } from "../../../context/useChat";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { deleteJWT } from "../../../common/auth-cookie";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ProfileSettings from "./ProfileSettings/ProfileSettings";

export default function ProfileContainer() {
  const { user } = useChat();
  const navigate = useNavigate();

  const logOut = () => {
    deleteJWT();
    navigate("/login");
  };

  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            sx={{ marginRight: 1, width: 70, height: 70 }}
            alt={`${user.fullName}'s profile photo`}
            src={user.photo}
          />
        </ListItemAvatar>

        <ListItemText
          primary={user.fullName}
          secondary={
            <Link
              component={"button"}
              underline="hover"
              color="inherit"
              onClick={logOut}
            >
              Log out
            </Link>
          }
          sx={{ marginLeft: 2 }}
        />

        <ListItemSecondaryAction>
          <ProfileSettings />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
