import React, { useState, useEffect } from "react";
import data from "../db/Apprentice_TandemFor400_Data.json";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState();
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const correctAnswerPlacement = Math.floor(Math.random() * 4);
  const [answerFeedback, setAnswerFeedback] = useState("");
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  let correctAnswer = "";
  const [dataShuffle, setDataShuffle] = useState(data);
  let percentageScore = Math.ceil(10 * score);

  const handleAnswerButton = isCorrect => {
    if (isCorrect) {
      setScore(score + 1);
      setIsCorrect(true);
      setAnswerFeedback("Correct!");
    } else {
      setIsCorrect(false);
      setAnswerFeedback(
        `Sorry! That's incorrect. The correct answer is "${correctAnswer}".`
      );
    }
    setNextButtonDisabled(false);
    setButtonIsDisabled(true);
  };

  const handleNextButton = () => {
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < 10) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      document.getElementById("question-count").style.display = "none";
      document.getElementById("next-button").style.display = "none";
      document.getElementById("bottom").style.display = "none";
    }
    setNextButtonDisabled(true);
    setButtonIsDisabled(false);
    setAnswerFeedback("");
  };

  const shuffle = () => {
    let arrayCopy = dataShuffle.slice();

    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    setDataShuffle(arrayCopy);
  };

  useEffect(() => {
    shuffle();
  }, []);

  return (
    <div>
      <header>
        <h1>Tandem for 400!</h1>
      </header>

      <main id="question-container">
        {showScore ? (
          <section id="score-page">
            <p>You got {score} out of 10 correct.</p>
            <p>Your score is {percentageScore}%</p>
          </section>
        ) : (
          dataShuffle.map((element, id) => {
            if (id === currentQuestion) {
              correctAnswer = element.correct;
              const answers = element.incorrect.slice();
              answers.splice(correctAnswerPlacement, 0, element.correct);

              return (
                <section className="answers">
                  <h2 key={id} id="question">
                    {element.question}
                  </h2>

                  {answers.map(answer => {
                    return (
                      <ul>
                        <button
                          className="answer_buttons"
                          disabled={buttonIsDisabled}
                          onClick={() =>
                            handleAnswerButton(
                              !element.incorrect.includes(answer)
                            )
                          }
                        >
                          {answer}
                        </button>
                      </ul>
                    );
                  })}

                  <p>{answerFeedback}</p>
                </section>
              );
            }
          })
        )}

        <section id="bottom">
          <p id="question-count">
            Question <em>{currentQuestion + 1}</em> of <em>10</em>
          </p>

          <button
            id="next-button"
            disabled={nextButtonDisabled}
            onClick={() => handleNextButton()}
          >
            Next >
          </button>
        </section>
      </main>
    </div>
  );
};

export default App;
