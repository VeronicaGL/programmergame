import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { logout } from '../services/api-services';
import { BiHappyBeaming } from "react-icons/bi";
import { TbWorldCode } from "react-icons/tb";
import { SlLogin } from "react-icons/sl";
import { SlLogout } from "react-icons/sl";
import { TfiGame } from "react-icons/tfi";



export default function Navbar() {
  const { user, onLogout } = useAuthContext()
  const navigate = useNavigate()

  function logoutApi() {
    logout().then(() => {
      localStorage.removeItem('token')
      onLogout()
      navigate('/login')
    })
  }

  return (
    <header className="bg-gradient-to-r from-violet-700 to-rose-500 p-3">
      <nav className="container flex items-center justify-between">
        {
          user ? 
          <Link to="/">
            <div className="text-white">
            <p className='flex gap-2'><BiHappyBeaming /></p>
              Hola, {user.userName}!
            </div>
          </Link>
         : <Link className="text-white text-2xl font-bold" to="/home"><TbWorldCode /></Link>
        }
        <div className="flex items-center space-x-4 flex-grow justify-center">
          <Link to="/" className="text-white">
            Home
          </Link>
          <a href="/play" className="text-white">
            <TfiGame />
            ¡Dale al play!
          </a>
          {user ? (
          <a href="/profile" className="text-white">
          perfil
        </a>
        ) : (
          <Link to="/" > </Link>
        )}
        </div>
        {user ? (
          <button
            className="text-white px-4 py-2 rounded-md"
            onClick={logoutApi}
          >
          <SlLogout />
            Logout
          </button>
        ) : (
          <Link
            className="text-white px-4 py-2 rounded-md"
            to="/login">
          <SlLogin />
          login
          </Link>
        )}
      </nav>
    </header>
  );
}