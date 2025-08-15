import React , {useContext} from 'react'
import { UserProvider } from '../context/user.context.jsx'
import AppRoutes from '../routes/AppRoutes.jsx'

const App = () => {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  )
}

export default App
