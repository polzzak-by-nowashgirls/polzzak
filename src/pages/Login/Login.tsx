import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useToast } from '@/hooks/useToast';

function Login() {
  const location = useLocation();
  const showToast = useToast();

  useEffect(() => {
    if (location.state?.toastMessage) {
      showToast(location.state.toastMessage);
    }
  }, [location.state, showToast]);

  return (
    <div>
      <h1>로그인</h1>
    </div>
  );
}

export default Login;
