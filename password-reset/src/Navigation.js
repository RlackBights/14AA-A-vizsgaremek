import { Link, Navigate, NavLink } from 'react-router-dom'
export default function Navbar() {
    return (
    <nav className="d-flex justify-content-center">
      <div className="p-2">
      <NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" }>Home</NavLink>
      </div>
      <div className="p-2">
      <NavLink to="/aboutus" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" }>About Us</NavLink>
      </div>
      <div className="p-2">
      <NavLink to="/download" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" }>Download</NavLink>
      </div>
      <div className="p-2">
      <NavLink to="/login" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" }>Login</NavLink>
      </div>
      <div className="p-2">
      <NavLink to="/registration" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" }>Register</NavLink>
      </div>
    </nav>
  )
}