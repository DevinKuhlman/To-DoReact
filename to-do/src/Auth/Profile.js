import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Profile.css'

export default function Profile() {
    const {currentUser} = useAuth()

    
  return (
    <span className='profile p-2'>
        {/* currentUser.email. If we had a display name to call upon, we called it using .split: */}
        {/* Below we call to the currentUser object to properly greet a Logged in user. If displayName was null, we chose
        {/* Hello {currentUser.displayName.split(' ')[0]} will show the first name only. */}
        Hello {!currentUser.displayName ? currentUser.email : currentUser.displayName.split(' '[0])}!
        <img src={currentUser.photoURL} alt='User profile pic' />
    </span>
  )
}
