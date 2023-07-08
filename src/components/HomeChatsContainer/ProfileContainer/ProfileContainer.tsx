import { useChat } from '../../../context/useChat';

export default function ProfileContainer() {

  const { user } = useChat();

  return (
    <div className='profile-grid'>{user.fullName}</div>
  )
}
