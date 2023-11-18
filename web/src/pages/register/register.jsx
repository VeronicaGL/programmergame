import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../../services/api-services'
import { useAuthContext } from '../../contexts/AuthContext'

export default function CreateUserPage() {
  const { handleSubmit, register, formState: { errors } } = useForm()
  const { onLogin } = useAuthContext()
  const navigate = useNavigate()

  const handleRegister = async (data) => {
    try {
      const response = await createUser(data)
      await onLogin(data.userName, data.password)
      navigate('/home')
    } catch (error) {
      console.error('Error durante el registro:', error)
    }
  }

  return (
    <div className="flex flex-col justify-center py-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-2 text-center text-2xl font-bold leading-5 tracking-tight text-violet-900">
          Registro
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block m text-sm font-medium leading-3 text-violet-900">
              Nombre de Usuario
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="userName"
                {...register("userName", { required: 'Este campo es obligatorio' })}
                className="block w-full rounded-md border-0 py-1.5 text-violet-900 shadow-sm ring-1 ring-inset ring-violet-300 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
              />
              {errors.userName && <span>{errors.userName.message}</span>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-violet-900">
              Correo Electrónico
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="email"
                {...register("email", { required: 'Este campo es obligatorio' })}
                className="block w-full rounded-md border-0 py-1.5 text-violet-900 shadow-sm ring-1 ring-inset ring-violet-300 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-violet-900">
              Contraseña
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                {...register("password", { required: 'Este campo es obligatorio' })}
                className="block w-full rounded-md border-0 py-1.5 text-violet-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 shadow-lg shadow-indigo-500/75 mt-4 bg-purple-700 opacity-50 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-150 text-white rounded "
          >
            Registrarse
          </button>
        </form>
        <div className="mt-4 text-center">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-rose-600 hover:text-rose-500">Inicia sesión aquí.</Link>
        </div>
      </div>
    </div>
  )
}