import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signUp } from '../../firebase'
import netfilx_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [signState, setSignState] = useState("Sign In")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [passType, setPassType] = useState('password')
  const [errors, setErrors] = useState({ name: "", email: "", password: "" })

  const validateForm = () => {
    let valid = true
    const newErrors = { name: "", email: "", password: "" }

    if (signState === "Sign Up" && name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters"
      valid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format"
      valid = false
    }

    const passwordRegex = /^.{6,}$/
    if (!passwordRegex.test(password)) {
      newErrors.password = "Password must be at least 6 characters"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const user_auth = async (event) => {
    event.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      if (signState === "Sign In") {
        await login(email, password)
      } else {
        await signUp(name, email, password)
      }
    } catch (error) {
      console.error("Authentication error:", error.message)
    }
    setLoading(false)
  }

  return loading ? (
    <div className="login-spinner">
      <img src={netfilx_spinner} alt="Loading..." />
    </div>
  ) : (
    <div className='login'>
      <img src={logo} className='login-logo' alt="Netflix Logo" />

      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your name'
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            type={passType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <button type='submit'>{signState}</button>

          <div className="form-help">
            <div className="remember">
              <input
                type="checkbox"
                id="showPassword"
                onChange={() => setPassType(passType === 'password' ? 'text' : 'password')}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>New to Netflix? <span onClick={() => { setSignState("Sign Up"); setErrors({}) }}>Sign Up Now</span></p>
          ) : (
            <p>Already have an Account? <span onClick={() => { setSignState("Sign In"); setErrors({}) }}>Sign In Now</span></p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
