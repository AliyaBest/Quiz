import React, { useState } from 'react';
import data from '../db/Apprentice_TandemFor400_Data.json'

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)
  const correctAnswerPlacement = Math.floor((Math.random() * 4) + 1);

  const handleAnswerButton = (isCorrect)=>{
    if(isCorrect){
      setScore(score + 1)
      alert('correct')
    } else {
      alert('incorrect')
    }
    const nextQuestion = currentQuestion + 1

    if(nextQuestion < data.length){
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }

  }

  return (
    <div>
      <header>
        <h1>Tandem for 400!</h1>
        <h2>Question {currentQuestion + 1} of {data.length}</h2>
      </header>

      <section>
        {showScore ? <div>{score} out of {data.length}</div> : data.map((element,id) => {

          if(id === currentQuestion){
            const answers = element.incorrect.slice()
            answers.splice(correctAnswerPlacement, 0, element.correct)
            return(
            <div>
            <h3 key={id}>{element.question}</h3>
            {answers.map(answer=>{

             return <button onClick={()=>handleAnswerButton(!element.incorrect.includes(answer))}>{answer}</button>
            })}
            </div>
            )
          }

        })}
      </section>

    </div>

  )
}

export default App
