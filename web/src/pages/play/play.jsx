import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { randomQuestionsList, checkAnswer, getInfoUser } from '../../services/api-services';
import { json, useNavigate } from 'react-router-dom';
import { TbHeartCode } from 'react-icons/tb';


const Play = () => {
  const { onLogin } = useAuthContext();

  const [questions, setQuestions] = useState(null);
  const [orderQuestion, setOrderQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigation = useNavigate();
  const [lives, setLives] = useState(2);
  const [gameState, setGameState] = useState('playing');

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[orderQuestion];

    checkAnswer({ question: currentQuestion.id, selectedAnswer })
      .then(response => {
        if (!response.isCorrect) {
          setLives((prev) => (prev > 0 ? prev - 1 : 0));
        }
        setOrderQuestion((prevOrder) => prevOrder + 1);
        setSelectedAnswer(null);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    // Cargar preguntas aleatorias al montar el componente o al reiniciar el juego
    if (gameState === 'playing') {
      if (orderQuestion === 0) {
        randomQuestionsList()
          .then((randoms) => {
            setQuestions(randoms.questions);
          })
          .catch((error) => console.error(error));
      }
    }
  }, [gameState, orderQuestion]);

  useEffect(() => {
    if (lives === 0 || orderQuestion === questions?.length) {
      setTimeout(() => {
        getInfoUser()
          .then(user => {
            onLogin(user);
            navigation("/profile")
          })
          .catch(error => console.error(error));
      }, 4000);
    }
  }, [lives, orderQuestion]);

  const iconsLive = Array.from({ length: lives }, (_, index) => (
    <TbHeartCode key={index} style={{ fontSize: '2rem' }} />
  ));
  return (
    <section className="mt-6 drop-shadow-2xl flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-[600px]">
        {questions && orderQuestion < questions.length && lives > 0 ? (
          <div className="">
            <p className="flex justify-end mb-6">{iconsLive}</p>
            <div className="text-center">
              <div className="question-container">
                <p className="font-semibold uppercase text-rose-700 p-4 mb-5">
                  {questions[orderQuestion].question}
                </p>
              </div>
              <label className="flex font-light hover:bg-slate-100 mb-3 answer-label">
                <input
                  type="checkbox"
                  id="draft"
                  name="answer"
                  value="a"
                  checked={selectedAnswer === 'a'}
                  onChange={() => handleAnswerSelect('a')}
                  className="mr-2 h-5 w-5 accent-violet-500 focus:accent-violet-300"
                />
                {questions[orderQuestion].a}
              </label>
              <label className="flex font-light hover:bg-slate-100 mb-3 answer-label">
                <input
                  type="checkbox"
                  name="answer"
                  value="b"
                  checked={selectedAnswer === 'b'}
                  onChange={() => handleAnswerSelect('b')}
                  className="mr-2 h-5 w-5 accent-violet-500 focus:accent-violet-300"
                />
                {questions[orderQuestion].b}
              </label>
              <label className="flex font-light hover:bg-slate-100 mb-3 answer-label">
                <input
                  type="checkbox"
                  name="answer"
                  value="c"
                  checked={selectedAnswer === 'c'}
                  onChange={() => handleAnswerSelect('c')}
                  className="mr-2 h-5 w-5 accent-violet-500 focus:accent-violet-300"
                />
                {questions[orderQuestion].c}
              </label>
              <label className="flex font-light hover:bg-slate-100 mb-3 answer-label">
                <input
                  type="checkbox"
                  name="answer"
                  value="d"
                  checked={selectedAnswer === 'd'}
                  onChange={() => handleAnswerSelect('d')}
                  className="mr-2 h-5 w-5 accent-violet-500 focus:accent-violet-300"
                />
                {questions[orderQuestion].d}
              </label>
              <button
                onClick={handleNextQuestion}
                className="shadow-lg shadow-indigo-500/75 mt-4 bg-purple-700 opacity-50 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-150 text-white py-1 px-5 rounded"
              >
                Siguiente Pregunta
              </button>
            </div>
          </div>
        ) : (
          <div>
             {lives  > 0  ? (
              <p>¡Has ganado!</p>
            ) : (
              <p>¡Has perdido!</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Play;