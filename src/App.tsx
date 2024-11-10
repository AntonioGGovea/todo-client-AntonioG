import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient, router } from './config';
import AuthProvider from './pages/Auth';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
