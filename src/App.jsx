import { useState } from 'react'
import LoginPage from './components/LoginPage.jsx'
import CharacterProfile from './components/CharacterProfile.jsx'
import { character } from './data/characters.js'
import './App.css'

const STORAGE_KEY = 'character_web_session'

function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null
    } catch {
      return null
    }
  })

  const handleLogin = (account) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account))
    setUser(account)
  }

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  return user ? (
    <CharacterProfile character={character} user={user} onLogout={handleLogout} />
  ) : (
    <LoginPage onLogin={handleLogin} />
  )
}

export default App
