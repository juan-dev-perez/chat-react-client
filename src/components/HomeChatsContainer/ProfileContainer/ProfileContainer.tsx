import ListItem from '@mui/material/ListItem';
import { useChat } from '../../../context/useChat';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { deleteJWT } from '../../../common/auth-cookie';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

export default function ProfileContainer() {

  const { user } = useChat();
  const navigate = useNavigate();

  const logOut = () => {
    deleteJWT();
    navigate('/login')
  }

  return (
    <List sx={{ padding:0, margin:0, height:'100%'}}>
      <ListItem sx={{ height:'100%' }}>

        <ListItemAvatar>
          <Avatar 
            sx={{ marginRight:1, width:70, height:70 }} 
            alt={user.fullName} 
            src="/static/images/avatar/1.jpg"
            />
        </ListItemAvatar>

        <ListItemText 
          primary={user.fullName} 
          secondary={
            <Link 
              component={'button'}
              underline="hover"
              color='inherit'
              onClick={ logOut }
            >
              Log out
            </Link>
          }
          sx={{ marginLeft:2 }} 
        />

      </ListItem>
    </List>
  )
}
