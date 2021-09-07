import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const AuthContext: any = React.createContext('')

export function AuthProvider({ children }: any) {
    const [user, setUser]: any = useState()
    const [loading, setLoading]: any = useState(true)
  
    useEffect(() => {
      // Check active sessions and sets the user
      const session = supabase.auth.session()
  
      setUser(session?.user ?? null)
      setLoading(false)
  
      // Listen for changes on auth state (logged in, signed out, etc.)
      const { data: listener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null)
          setLoading(false)
        }
      )
  
      return () => {
        listener?.unsubscribe()
      }
    }, [])
  
    // Will be passed down to Signup, Login and Dashboard components
    const value = {
      signUp: (data: any) => supabase.auth.signUp(data),
      signIn: (data: any) => supabase.auth.signIn(data),
      signOut: () => supabase.auth.signOut(),
      user,
    }
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    )
  }
  
  export function useAuth() {
    return useContext(AuthContext)
  }
  