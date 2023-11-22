import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import programerImage from '/images/programmergame.png';
import { HiCursorArrowRays } from 'react-icons/hi2';
import { GiTrophyCup } from 'react-icons/gi';
import { getTopUsers } from '../../services/api-services';

const Home = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [cacheBuster, setCacheBuster] = useState(Math.random());

  const useAuthContext = () => {
    const { user } = useAuthContext();
    const avatarUrl = user ? user.avatarUrl : `https://i.pravatar.cc/150?u=${user.userName}`

    return { user: avatar };
  };

  const fetchTopUsers = async () => {
    try {
      const response = await getTopUsers(`?cacheBuster=${cacheBuster}`);
      console.log(response);

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

  const winners = topUsers.slice(0, 3);

  return (
    <div className="mt-2 flex flex-col items-center">
      <div className="max-w-500 mb-10">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img className="w-80 h-80 float-right" src={programerImage} alt="Programador" />
          </div>
          <div className="p-4 text-justify max-w-lg">
            <a className="text-center font-medium text-3xl text-black">
              ¿Quién quiere ser programador?
            </a>
            <p className="mt-8 text-gray-700 text-xl">
              Si eres novato, senior, intermedio... da igual el nivel que tengas.
              Anímate a contestar las preguntas y sacar el mayor número de puntos.
              Pon a prueba tu conocimiento en programación.
            </p>
            <p className=" text-xl uppercase tracking-wide text-purple-800 mt-5">
              ¿Aceptas el desafío?
            </p>
            <div className="flex items-center">
              <Link to="/register" className="text-pink-700 hover:text-violet-500 text-4xl font-semibold mr-3">
                Regístrate aquí
              </Link>
              <HiCursorArrowRays className="animate-bounce w-6 h-6 opacity-80 mt-10 text-violet-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-4xl font-semibold text-center mb-6">¡Top programmers!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-100 justify-items-center">
          {winners.map((user, index) => (
            <div key={user.id} className="block rounded-lg bg-violet shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-violet-100">
              <div className="p-4">
                <img
                  className="h-200 w-200 mx-auto mb-4"
                  src={user.avatarUrl || `https://i.pravatar.cc/150?u=${user.userName}`}
                  alt={user.userName}
                />
                <h5 className="text-center mb-5 text-3xl font-medium leading-tight dark:text-purple-700 mb-2">
                <GiTrophyCup className={`inline-block mr-2 ${index === 0 ? 'text-gold' : (index === 1 ? 'text-silver' : 'text-bronze')}`} />
                  {user && user.userName}
                </h5>
                <p className="text-purple-700 dark:text-rose-700">
                  Puntos: {user.level}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;