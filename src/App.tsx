import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Signup } from './components/Signup'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { AuthProvider } from './components/Auth'
import { PrivateRoute } from './PrivateRoute'

import './style.css'

export function App() {
  return (
    <div>
      <link rel="stylesheet" href="https://unpkg.com/axist@latest/dist/axist.min.css" />
      <link rel="stylesheet" href="style.css" />
      <h1 className="test">Trick Calculator</h1>
      <Router>
        {/* Wrap routes in the AuthProvider 👇 */}
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}