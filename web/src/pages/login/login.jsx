import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { login } from '../../services/api-services'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const { register, handleSubmit } = useForm()
  const { onLogin } = useAuthContext();
  const navigation = useNavigate()

  function handleLogin(data) {
    login(data).then((response) => {
      onLogin(response)
      navigation("/profile")
    })
  }

  return (
    <div className="flex flex-col justify-center py-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-violet-900">
          Iniciar Sesión
        </h2>
      </div>
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-2">
          <label htmlFor="userName" className="mt-2 block text-sm font-medium leading-6 text-violet-900">
            Usuario
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="userName"
              id="userName"
              {...register("userName")}
              className="block w-full rounded-md border-0 py-1.5 text-violet-900 shadow-sm ring-1 ring-inset ring--100 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-5"
            />
          </div>
          <label htmlFor="password" className="mt-2 block text-sm font-medium leading-6 text-violet-900">
            Contraseña
          </label>
          <div className="mt-2">
            <input
              type="password"
              name="password"
              id="password"
              {...register("password")}
              className="block w-full rounded-md border-0 py-1.5 text-violet-900 shadow-sm ring-1 ring-inset ring--100 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-5"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 shadow-lg shadow-indigo-500/75 mt-4 bg-purple-700 opacity-50 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-150 text-white rounded"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
};