import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_icon from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'
import Swal from 'sweetalert2'

const Navbar = () => {
    const navRef = useRef()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 80) {
                navRef.current.classList.add('nav-dark')
            } else {
                navRef.current.classList.remove('nav-dark')
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e50914',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, log out'
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
            }
        })
    }

    return (
        <div className='navbar' ref={navRef}>
            <div className="navbar-left">
                <img src={logo} alt="Logo" />
                <ul>
                    <li>Home</li>
                    <li>TV Show</li>
                    <li>Movies</li>
                    <li>New & Popular</li>
                    <li>Browse by Languages</li>
                </ul>
            </div>
            <div className="navbar-right">
                <img src={search_icon} alt="Search" className='icons' />
                <img src={bell_icon} alt="Notifications" className='icons' />
                <div className="navbar-profile">
                    <img src={profile_icon} alt="Profile" className='profile' />
                    <img src={caret_icon} alt="Caret" />
                    <div className="dropdown">
                        <p onClick={handleLogout} className='signout-btn'>Sign Out</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
