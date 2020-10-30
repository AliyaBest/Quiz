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
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true)
  let correctAnswer = ''
  let percentageScore = Math.ceil((100 / data.length) * score)

  const handleAnswerButton = (isCorrect)=>{
    if(isCorrect){
      setScore(score + 1)
      setIsCorrect(true)
      setAnswerFeedback('Correct')
    } else {
      setIsCorrect(false)
      setAnswerFeedback(`Sorry! That's incorrect.The correct answer is "${correctAnswer}"`)

    }
    setNextButtonDisabled(false)
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
    setNextButtonDisabled(true)
    setButtonIsDisabled(false)
    setAnswerFeedback('')
  }

  return (
    <div>
      <header>
        <h1>Tandem for 400!</h1>
        <h2>Question {currentQuestion + 1} of {data.length}</h2>
      </header>

      <main>
        {showScore ?
          <section>
            <p>You got {score} out of {data.length} correct.</p>
            <p>Your score is {percentageScore}%</p>
          </section> :

          data
            .map((element,id) => {
              correctAnswer = element.correct

              if(id === currentQuestion){
                const answers = element.incorrect.slice()
                answers.splice(correctAnswerPlacement, 0, element.correct)

                return(
                  <section className="answers">
                    <h3 key={id}>{element.question}</h3>

                    {answers
                      .map(answer=>{
                        return <ul>
                                  <li className="answer_buttons" disabled={buttonIsDisabled} onClick={()=>handleAnswerButton(!element.incorrect.includes(answer))}>
                                    {answer}
                                  </li>
                                </ul>
                  })}
                  <p>{answerFeedback}</p>
                  </section>
                )
          }

        })}
      </main>

      <button id="next-button" disabled={nextButtonDisabled} onClick={()=>handleNextButton()}>Next</button>


    </div>

  )
}

export default App
