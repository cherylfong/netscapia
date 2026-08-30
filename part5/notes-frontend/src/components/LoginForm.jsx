import { useState } from 'react'
import { Button } from '@mui/material'

const LoginForm = (
  {
    handleLogin
  }
) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()

    handleLogin(username, password, setUsername, setPassword)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <div>
          <label>
                        username
            <input
              type="text"
              value={username}
              onChange={event => setUsername(event.target.value)} />
          </label>
        </div>
        <div>
          <label>
                        password
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)} />
          </label>
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>login</Button>
      </form>
    </div>
  )
}

export default LoginForm

