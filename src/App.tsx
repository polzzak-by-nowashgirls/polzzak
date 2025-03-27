import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import Toast from '@/components/Toast/Toast';
import router from '@/router';

function App() {
  return (
    <>
      <HelmetProvider>
        <RouterProvider router={router} />
        <Toast />
      </HelmetProvider>
    </>
  );
}

export default App;
