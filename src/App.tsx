import { QueryClientProvider } from '@tanstack/react-query'
import Todo from './pages/Todo'
import { queryClient } from './config'
import AuthProvider from './components/Auth'

// TODO: Add error layer
function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Todo />
        </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
