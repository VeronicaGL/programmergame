import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { useForm } from 'react-hook-form'

export default function Profile() {
  const { user } = useAuthContext();
  
  return (
    <section>
      <h1>Perfil de Usuario</h1>
      <section>
        <h3>Datos Personales</h3>
        <div>
          <label>UserName</label>
          <p>{user.userName}</p>
        </div>
        <div>
          Media de acierto : {(user.rightQuestions.length / (user.rightQuestions.length + user.wrongQuestions.length)) * 100}%
        </div>
        <section className='flex'>
          <div className='right-questions'>
            <p>Preguntas acertadas: {user.rightQuestions.length}</p>
            {user.rightQuestions.map(question => <p>{question.question}</p>)}
          </div>
          <div className='wrong-questions'>
            <p>Preguntas falladas: {user.wrongQuestions.length}</p>
            {user.wrongQuestions.map(question => <p>{question.question}</p>)}
          </div>
        </section>
      </section>
    </section>
  )
}

/**
 * {
  "wrongQuestions": [],
  "name": "Vero",
  "userName": "Vero",
  "email": "vero@example.com",
  "password": "$2a$10$qeKs5ETVOXlP4xKf65t8iu1PH9ZcxEUIdXlINf52JSMVpvy1HZ/5a",
  "level": 0,
  "isAdmin": true,
  "rightQuestions": [
    {
      "_id": "654a991618776b7a72338e4c",
      "question": "¿Qué se refiere coúnmente como backenden el desarrollo web?",
      "a": "La parte delantera de un sitio web",
      "b": "La parte visible de una página web",
      "c": "La parte del servidor que maneja la lógca y la base de datos",
      "d": "La parte de diseñográfico de un sito web",
      "solution": "c",
      "level": 2,
      "__v": 0
    },
    {
      "_id": "654a991618776b7a72338e4c",
      "question": "¿Qué se refiere coúnmente como backenden el desarrollo web?",
      "a": "La parte delantera de un sitio web",
      "b": "La parte visible de una página web",
      "c": "La parte del servidor que maneja la lógca y la base de datos",
      "d": "La parte de diseñográfico de un sito web",
      "solution": "c",
      "level": 2,
      "__v": 0
    }
  ],
  "id": "654a985018776b7a72338e37",
  "totalAnswers": 2
}
 */