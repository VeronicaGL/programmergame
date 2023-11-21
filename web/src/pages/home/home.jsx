import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import programerImage from '/images/programmergame.png';
import { HiCursorArrowRays } from 'react-icons/hi2';
import { getTopUsers } from '../../services/api-services';

const Home = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [cacheBuster, setCacheBuster] = useState(Math.random());

  const fetchTopUsers = async () => {
    try {
      const response = await getTopUsers(`?cacheBuster=${cacheBuster}`)
      console.log(response)

      if (response.status === 304) {
        console.log('No hay cambios en los datos.');
        return;
      }

      const sortedTopUsers = response.topUsers.sort((a, b) => b.level - a.level);

      setTopUsers(sortedTopUsers);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  useEffect(() => {

    fetchTopUsers();
  }, [cacheBuster]);

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
              <Link to="/register" className="text-pink-700 hover:text-violet-500 text-4xl font-semibold">
                Regístrate aquí
              </Link>
              <div className="mt-2">
                <HiCursorArrowRays className="text-violet-500 w-8 h-8 ml-20" />
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-2xl font-semibold mb-2">Top Usuarios:</h2>
              <ul>
                {topUsers.map((user) => (
                  <li key={user.id}>{user.userName} - Puntos: {user.level}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;