import { useState } from 'react'
import { users } from '../data/users.js'

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!username.trim() || !password) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน')
      return
    }
    const account = users.find(
      (u) => u.username === username.trim() && u.password === password,
    )
    if (!account) {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่')
      return
    }
    onLogin(account)
  }

  const fillDemo = (demoUser) => {
    setUsername(demoUser.username)
    setPassword(demoUser.password)
    setError('')
  }

  return (
    <div className="page auth-page">
      <div className="auth-bg" aria-hidden="true" />
      <main className="auth-card">
        <div className="auth-logo" aria-hidden="true">
          🦸
        </div>
        <h1 className="auth-title">ประวัติบุคคล</h1>
        <p className="auth-subtitle">
          Biography · เข้าสู่ระบบเพื่อชมประวัติของบุคคลสำคัญ
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>ชื่อผู้ใช้</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="กรอกชื่อผู้ใช้ เช่น admin"
              autoComplete="username"
            />
          </label>

          <label className="field">
            <span>รหัสผ่าน</span>
            <div className="password-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="กรอกรหัสผ่าน"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </label>

          {error && (
            <p className="auth-error" role="alert">
              ⚠️ {error}
            </p>
          )}

          <button type="submit" className="btn btn-primary btn-block">
            เข้าสู่ระบบ
          </button>
        </form>

        <div className="demo-box">
          <p className="demo-title">💡 บัญชีทดลอง (คลิกเพื่อกรอกอัตโนมัติ)</p>
          <div className="demo-users">
            {users.map((u) => (
              <button
                key={u.username}
                type="button"
                className="demo-chip"
                onClick={() => fillDemo(u)}
              >
                {u.username} / {u.password}
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="auth-footer">
        สร้างด้วย React + Vite · วิชา Front-End
      </footer>
    </div>
  )
}
