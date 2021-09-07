import { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from './Auth'
import trickPic from '../images/trick_ski.jpg'



export function Signup() {
    const emailRef: any = useRef()
    const passwordRef: any = useRef()

    // Get signUp function from the auth context
  const { signUp }: any = useAuth()

  const history = useHistory()

  async function handleSubmit(e: any) {
    e.preventDefault()

    // Get email and password input values
    const email: string = emailRef.current.value
    const password: string = passwordRef.current.value

    // Calls `signUp` function from the context
    const { user, session, error } = await signUp({ email, password })
    alert("Good News!")

    if (error) {
      alert('error signing in')
    } else {
      // Redirect user to Dashboard
      history.push('/')
    }
  }


    return(
    <div className="row">
      <div className="col">
        <form onSubmit={handleSubmit}>
          <label htmlFor="input-email">Email</label>
          <input id="input-email" type="email" ref={emailRef} />

          <label htmlFor="input-password">Password</label>
          <input id="input-password" type="password" ref={passwordRef} />

          <br />

          <button type="submit">Sign up</button>
        </form>

        <br />

        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>

      <img className="col pic" src={trickPic} alt="Trick Ski" />
    </div>      
    )
}