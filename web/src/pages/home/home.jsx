import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import programerImage from '/images/programmergame.png';
import { HiCursorArrowRays } from 'react-icons/hi2';
import { getTopUsers } from '../../services/api-services';
import { useAuthContext } from '../../contexts/AuthContext';

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

  return (
    <div className="mt-4 flex justify-center items-center">
      <div className="max-w-500">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img className="w-80 h-80 float-right" src={programerImage} alt="Programador" />
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
            <div className="mt-6 grid justify-items-center">
              <h2 className="text-2xl font-semibold mb-4 flex justify-center">Top Usuarios:</h2>
              <ul className="flex justify-center">
                {topUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-center block rounded-lg bg-violet shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-violet-100">
                    <div className="p-6 ">
                      <img
                        className="h-200 w-200 mx-auto"
                        src={user.avatarUrl || `https://i.pravatar.cc/150?u=${user.userName}`}
                      />
                      <h5
                        className="mb-2 text-2xl font-medium leading-tight text-purple-900 dark:text-purple-700">
                        {user && user.userName}
                      </h5>
                      <p className="mb-4 text-purple-700 dark:text-rose-700">
                        Puntos: {user.level}
                      </p>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home