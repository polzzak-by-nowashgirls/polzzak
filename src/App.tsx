import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import Toast from '@/components/Toast/Toast';
import router from '@/router';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toast />
        </QueryClientProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
