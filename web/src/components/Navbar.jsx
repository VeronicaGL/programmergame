import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { logout } from '../services/api-services';
import { BiHappyBeaming } from "react-icons/bi";
import { TbWorldCode } from "react-icons/tb";
import { SlLogin } from "react-icons/sl";
import { SlLogout } from "react-icons/sl";
import { TfiGame } from "react-icons/tfi";
import { FaUserGraduate } from "react-icons/fa6";

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
    <header className="bg-gradient-to-r grid justify-items-stretch from-violet-700 to-rose-500">
      <nav className="flex justify-center mt-2 space-x-20">
        {
          user ?
            <div className="text-white flex items-center justify-end">
              <p className='flex gap-2 mt-1'><BiHappyBeaming style={{ fontSize: '2rem' }} /></p>
              <div className="ml-4">Hola, {user.userName}!</div>
            </div>
            :
            <Link to="/" className="text-white"><TbWorldCode style={{ fontSize: '2.5rem' }} className="mb-2" /></Link>
        }
        {
          user ?
            <Link to="/play">
              <div className="mt-1 p-2 text-white flex items-center justify-end"><TfiGame style={{ fontSize: '2rem' }} />
                <div className="ml-4">¡Dale al play!</div>
              </div>
            </Link>
            :
            <p></p>
        }
        {
          user ? (
            <a href="/profile" className="mt-1 text-white flex items-center justify-end"> <FaUserGraduate style={{ fontSize: '2rem' }} />
              <div className="ml-4">Perfil</div>
            </a>
          ) : (
            <Link to="/" > </Link>
          )}
        {user ? (
          <button
            className="text-white rounded-md"
            onClick={logoutApi}
          >
            <SlLogout style={{ fontSize: '2rem' }} className="mt-1" />

          </button>
        ) : (
          <Link
            className="text-white rounded-md"
            to="/login">
            <SlLogin style={{ fontSize: '2rem' }} className="mt-1" />
          </Link>
        )}
      </nav>
    </header>
  );
}