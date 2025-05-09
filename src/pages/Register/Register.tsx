import { Outlet } from 'react-router-dom';

function Register() {
  return (
    <main className="flex-1 overflow-auto p-6">
      <Outlet />
    </main>
  );
}

export default Register;
