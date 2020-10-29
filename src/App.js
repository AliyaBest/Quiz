import React, { useState } from 'react';
import data from '../db/Apprentice_TandemFor400_Data.json'

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)
  const [isCorrect, setIsCorrect] = useState()
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false)
  const correctAnswerPlacement = Math.floor((Math.random() * 4) + 1);
  const [answerFeedback, setAnswerFeedback] = useState('')
  let correctAnswer = ''

  const handleAnswerButton = (isCorrect)=>{
    if(isCorrect){
      setScore(score + 1)
      setIsCorrect(true)
      setAnswerFeedback('Correct')
    } else {
      setIsCorrect(false)
      setAnswerFeedback(`Sorry! That's incorrect. The correct answer is ${correctAnswer}`)

    }

    setButtonIsDisabled(true)
   }


  const handleNextButton = ()=>{
    const nextQuestion = currentQuestion + 1

    if(nextQuestion < data.length){
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
      document.getElementById('next-button').style.display = "none"
    }
    setButtonIsDisabled(false)
    setAnswerFeedback('')

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

            correctAnswer = element.correct


            answers.splice(correctAnswerPlacement, 0, element.correct)
            return(
            <div className="answers">
            <h3 key={id}>{element.question}</h3>
            {answers.map(answer=>{

             return <div><ul><button disabled={buttonIsDisabled} className="answer_buttons" onClick={()=>handleAnswerButton(!element.incorrect.includes(answer))}><li>{answer}</li></button></ul>
             </div>
            })}
            <p>{answerFeedback}</p>
            </div>
            )
          }

        })}
      </section>
      <section>
        <button id="next-button" onClick={()=>handleNextButton()}>Next</button>
      </section>

    </div>

  )
}

export default App
