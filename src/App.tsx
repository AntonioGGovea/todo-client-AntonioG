import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient, router } from './config';
import AuthProvider from './components/Auth';
import { RouterProvider } from 'react-router-dom';

// TODO: Add error layer
function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <AuthProvider />
    </QueryClientProvider>
  )
}

export default App
