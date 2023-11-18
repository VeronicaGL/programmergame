import { Link } from 'react-router-dom';
import programerImage from '/images/programmergame.jpg'

const Home = () => {
  return (
    <div className="flex items-center justify-center mt-6" >
      <div className="max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0">
          </div>
          <div className="p-6">
            <img className='p-2 w-80 h-80 float-right' src={programerImage} />
            <a href="#" className="mt-16 block text-lg leading-tight font-medium text-black hover:underline">
              ¿Quién quiere ser programador?
            </a>
            <p className="mt-2 text-gray-700">
              Si eres novato, senior, intermedio... da igual el nivel que tengas.
              Anímate a contestar las preguntas y sacar el mayor número de puntos.
              Pon a prueba tu conocimiento en programación.
            </p>
            <p className="uppercase tracking-wide text-sm text-purple-800 font-semibold mt-4">
              ¿Aceptas el desafío?
            </p>
            <div className="mt-4">
              <Link to="/register" className="text-pink-700 hover:text-violet-500">Regístrate aquí</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;