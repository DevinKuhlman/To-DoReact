import React, { useState, useEffect, useContext } from 'react'
import {auth} from '../base'//gives us access to the auth object which initializes authentication (who are you)

import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'


const AuthContext = React.createContext()


export function useAuth() {
    return useContext(AuthContext)
}


export default function AuthProvider({children}) {

    
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    //login functionality
    const githubAuthProvider = new GithubAuthProvider()

    async function login() {
        return (signInWithPopup(auth, githubAuthProvider).then(authData => {
            console.log(authData)
            setCurrentUser(authData.user)
        }))
    }

    //Logout functionality
    async function logout() {
        signOut(auth).then(setCurrentUser(null))
    }

    //Below we write an object to hold currentUser info and login/logout functions so we can use them in child components.
    //We will pass this as a prop in the return further below.
    const value = {currentUser, login, logout}

    useEffect(() => {
        //authChange will use firebase functionality to get user info, set the currentUser hook to the value retrieved,
        //and allow components to load in using the custom hook (loading).
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return authChange
    }, [])

  return (
    <AuthContext.Provider value={value}>
        {/* Below we are waiting for the AuthContext info to populate before loading the child components in the UI */}
        {!loading && children}
    </AuthContext.Provider>
  )
}
