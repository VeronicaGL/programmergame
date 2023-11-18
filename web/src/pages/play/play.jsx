import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { randomQuestionsList, checkAnswer, getInfoUser } from '../../services/api-services'
import { useNavigate } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";

const Play = () => {
  const { onLogin } = useAuthContext()

  const [questions, setQuestions] = useState(null);
  const [orderQuestion, setOrderQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigation = useNavigate()
  const [lives, setLives] = useState(2);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[orderQuestion];

    checkAnswer({ question: currentQuestion.id, selectedAnswer })
      .then(response => {
        if (!response.isCorrect) {
          setLives(prev => prev - 1)
        }
        setOrderQuestion((prevOrder) => prevOrder + 1)
        setSelectedAnswer(null);
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    if (lives === 0 || orderQuestion === questions?.length) {
      setTimeout(() => {
        getInfoUser()
        .then(user => {
          onLogin(user)
          navigation("/profile")
        })
        .catch(error => console.error(error))
      }, 4000)
    }
  }, [lives, orderQuestion])

  useEffect(() => {
    randomQuestionsList()
      .then((randoms) => {
        setQuestions(randoms.questions)
      })
      .catch((error) => console.error(error))
  }, []);

  return (
    <section className="mt-12 drop-shadow-2xl flex items-center justify-center mt-[80px]">
      <div className="bg-white p-9 rounded shadow-md">
        {questions && orderQuestion < questions.length && lives > 0 ? (
          <div>
            <p>{questions[orderQuestion].id}</p>
            <p className='flex gap-2'><FaHeart />{lives}</p>
            <p>length: {questions.length}</p>
            <p className="font-semibold uppercase text-rose-700 mb-4">{questions[orderQuestion].question}</p>
            <label className="font-light block mb-2 hover:bg-slate-100">
              <input
                type="checkbox"
                id="draft"
                name="answer"
                value="a"
                checked={selectedAnswer === 'a'}
                onChange={() => handleAnswerSelect('a')}
                className="mr-2 accent-violet-500 focus:accent-violet-300"

              />
              {questions[orderQuestion].a}
            </label>
            <label className="font-light block mb-2 hover:bg-slate-100">
              <input
                type="checkbox"
                name="answer"
                value="b"
                checked={selectedAnswer === 'b'}
                onChange={() => handleAnswerSelect('b')}
                className="mr-2 accent-violet-500 focus:accent-violet-300"
              />
              {questions[orderQuestion].b}
            </label>
            <label className="font-light block mb-2 hover:bg-slate-100">
              <input
                type="checkbox"
                name="answer"
                value="c"
                checked={selectedAnswer === 'c'}
                onChange={() => handleAnswerSelect('c')}
                className="mr-2 accent-violet-500 focus:accent-violet-300"
              />
              {questions[orderQuestion].c}
            </label>
            <label className="font-light block mb-2 hover:bg-slate-100">
              <input
                type="checkbox"
                name="answer"
                value="d"
                checked={selectedAnswer === 'd'}
                onChange={() => handleAnswerSelect('d')}
                className="mr-2 accent-violet-500 focus:accent-violet-300"
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
        ) : (
         <div> 
          <p>¡Juego completado!</p>
        </div>
        )}
      </div>
    </section>
  )
}

export default Play