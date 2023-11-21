import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { useAuthContext } from '../../contexts/AuthContext';
import gravatar from 'gravatar'

const Profile = () => {
  const { user } = useAuthContext();
  const totalQuestions = user.rightQuestions.length + user.wrongQuestions.length;
  const avatarUrl = `https://i.pravatar.cc/150?u=${user.userName}`

  useEffect(() => {
    const rightQuestionsCount = user.rightQuestions.length;
    const wrongQuestionsCount = user.wrongQuestions.length;

    const usersChart = new Chart(document.getElementById('usersChart'), {
      type: 'doughnut',
      data: {
        labels: ['Preguntas Acertadas', 'Preguntas Falladas'],
        datasets: [{
          data: [rightQuestionsCount, wrongQuestionsCount],
          backgroundColor: ['#800080', '#D3D3D3'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom'
        }
      }
    });

    return () => {
      usersChart.destroy();
    };
  }, [user.rightQuestions.length, user.wrongQuestions.length]);

  return (
    <div className="flex justify-center items-center">
      <div className="image overflow-hidden">
        <img
          className="h-200 w-200 mx-auto"
          src={avatarUrl}
          alt="User Avatar"
        />
        <div className="bg-white p-2">
          <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow px-5 mt-4 divide-y rounded shadow-sm">
            <li className="flex items-center py-2">
              <span className="text-gray-900 leading-5 p-1">Username:</span>
              <span className="flex-grow">
                <span className="py-1 px-2 text-sm text-left">{user.userName}</span>
              </span>
            </li>
            <li className="flex items-center py-2">
              <span className="text-gray-900 p-1">Email:</span>
              <span className="py-1 px-2 text-sm">{user.email}</span>
            </li>
            <li className="flex items-center py-2">
              <span className="text-gray-900 p-1">Puntos:</span>
              <span className="py-1 px-2 text-sm">{user.level}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-8 text-center mt-8">
        <h2 className="text-gray-500 text-lg font-semibold pb-3"> Total de preguntas: {totalQuestions}</h2>
        <div className="my-5"></div>
        <div className="bg-white p-3 border-t-2 border-purple-400"></div>
        <div
          className="chart-container"
          style={{ position: 'relative', height: '250px', width: '100%' }}
        >
          <canvas id="usersChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Profile;