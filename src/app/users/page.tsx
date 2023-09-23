import axios from 'axios';
import SelectUser from '@/components/SelectUser';

async function loadUsers() {
  const { data } = await axios.get('http://localhost:3000/api/users');

  return data;
}

async function UsersPage() {
  const users = await loadUsers();

  return <SelectUser users={users} />;
}

export default UsersPage;
