import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import router from '@/router';

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
