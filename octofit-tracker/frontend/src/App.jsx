import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const usingCodespaces = Boolean(codespaceName)

  return (
    <main className="container py-4">
      <header className="mb-4">
        <h1 className="mb-2">OctoFit Tracker</h1>
        <p className="text-body-secondary mb-3">
          React 19 presentation tier with Codespaces-aware API routing.
        </p>
        <div className={`alert ${usingCodespaces ? 'alert-success' : 'alert-warning'} mb-0`}>
          {usingCodespaces
            ? `Using Codespaces API host: ${codespaceName}-8000.app.github.dev`
            : 'VITE_CODESPACE_NAME is not set. Falling back to localhost:8000.'}
        </div>
      </header>

      <nav className="nav nav-pills flex-wrap gap-2 mb-4">
        <NavLink to="/users" className="nav-link">Users</NavLink>
        <NavLink to="/teams" className="nav-link">Teams</NavLink>
        <NavLink to="/activities" className="nav-link">Activities</NavLink>
        <NavLink to="/leaderboard" className="nav-link">Leaderboard</NavLink>
        <NavLink to="/workouts" className="nav-link">Workouts</NavLink>
      </nav>

      <section>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </section>
    </main>
  )
}

export default App
