import { useChat } from '../../../context/useChat';
import './ProfileContainer.css';

export default function ProfileContainer() {

  const { user } = useChat();

  return (
    <div className='profile-grid'>{user.fullName}</div>
  )
}
