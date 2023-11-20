import { Link } from 'react-router-dom';
import programerImage from '/images/programmergame.png'
import { HiCursorArrowRays } from "react-icons/hi2";


const Home = () => {
  return (
    <div className="mt-4 flex justify-center items-center">
      <div className="max-w-{500}">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img className='w-80 h-80 float-right' src={programerImage} alt="Programador" />
          </div>
          <div className="p-4 text-justify grid justify-items-stretch max-w-lg">
            <a className="text-center mt-5 font-medium text-3xl text-black">
              ¿Quién quiere ser programador?
            </a>
            <p className="mt-5 text-gray-700 text-xl">
              Si eres novato, senior, intermedio... da igual el nivel que tengas.
              Anímate a contestar las preguntas y sacar el mayor número de puntos.
              Pon a prueba tu conocimiento en programación.
            </p>
            <p className=" text-xl uppercase tracking-wide text-purple-800 mt-3">
              ¿Aceptas el desafío?
            </p>
            <div className="mt-5">
              <Link to="/register" className="text-pink-700 hover:text-violet-500 text-4xl font-semibold">Regístrate aquí</Link>
              <div className="mt-2">
              <HiCursorArrowRays className="text-violet-500 w-8 h-8 ml-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;