import { Toaster } from 'react-hot-toast'
import SignUp from './components/SignUp'

function App() {
  return (
    <div className="App">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#D4208C',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#E51726',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <SignUp />
    </div>
  )
}

export default App