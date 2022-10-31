import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {
  const { currentUser } = useAuth()

  return (
    <Navbar expand='md' variant='dark' bg='dark' className='p-3'>
        <Navbar.Brand href='/'>ToDos</Navbar.Brand>
        {/* Hamburger button below */}
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
            {/* Links for each page will go here. In this project we are using react-router-dom, which carries a link
            component that will render the anchor tag associated with the router we made in App.js. To access the
            react-router-dom package, we must first: 
                1. npm install react-router-dom
                2. import { Link } from 'react-router-dom'          */}
            <Nav>
              {currentUser &&
              <>
                <Link to='/ToDos' className='nav-link'>ToDos</Link>
                <Link to='/Categories' className='nav-link'>Categories</Link>
                </>
              }
                {!currentUser &&
                  <Link to='/login' className='nav-link'>Login</Link>
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
