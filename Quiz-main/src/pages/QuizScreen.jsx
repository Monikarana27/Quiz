import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { quiz1 } from '../db/verbal_reasoning';
import ResultScreen from './ResultScreen';

const QuizScreen = () => {
  const { quizId } = useParams();

  // For now, let's use quiz1 data regardless of the extracted quizId
  const quizData = quiz1;

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFinish, setIsFinish] = useState(false);
  const [result, setResult] = useState([]);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveQuestion((prevQuestion) => Math.min(prevQuestion + 1, quizData.totalQuestions - 1));
    setSelectedAnswer(null);
  };

  const handlePrevious = () => {
    setActiveQuestion((prevQuestion) => Math.max(prevQuestion - 1, 0));
    setSelectedAnswer(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleFinishQuiz = () => {
    // Update the result array with the selected answer for the current question
    setResult((prevResult) => [
      ...prevResult,
      {
        Sno:quizData.questions[activeQuestion].Sno,
        question: quizData.questions[activeQuestion].question,
        userAnswer: selectedAnswer,
        correctAnswer:quizData.questions[activeQuestion].correctAnswer,
        explanation:quizData.questions[activeQuestion].explanation,
        isCorrect:(quizData.questions[activeQuestion].correctAnswer === selectedAnswer)
      },
    ]);

    // Calculate score
    const correctAnswers = quizData.questions.map((question) => question.correctAnswer);
    const userAnswers = result.map((r) => r.userAnswer);

    const correctCount = correctAnswers.filter((answer, index) => answer === userAnswers[index]).length;
    const calculatedScore = (correctCount / quizData.totalQuestions) * 100;

    setScore(calculatedScore);

    // Check if it's the last question to finish the quiz
    if (activeQuestion === quizData.totalQuestions - 1) {
      setIsFinish(true);
    } else {
      // Move to the next question
      handleNext();
    }
  };

  return (
    <div>
      {isFinish ? (
        <ResultScreen results={result} totalQuestions={quizData.totalQuestions} finalScore={score} />
      ) : (
        <div>
          <h1 className='text-center font-medium text-xl py-2'>{quizData.quizName}</h1>
          <p className='text-center text-sm py-2'>Category: {quizData.category}</p>

         {/* <li>
            {
              //list of all question number when click on this ques takes you to that question

            }
         </li> */}

          {quizData.questions.map((question, index) => (
            <div key={index} style={{ display: index === activeQuestion ? 'block' : 'none' }}>
              <div className='text-sm leading-6 mx-4'>{question.attachement}</div>
              <span>
                <h3 className='font-bold px-8 py-4'>Q{index + 1}: {question.question}</h3>
              </span>
              <div className='pl-8 '>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <label className=''>
                      <input
                        type="radio"
                        value={option}
                        onChange={() => handleOptionSelect(option)}
                        checked={selectedAnswer === option}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className='text-white flex space-x-8 pt-8'>
            <button
              onClick={handlePrevious}
              className={`p-2 rounded-md ml-4 ${activeQuestion === 0 ? 'bg-gray-400' : 'bg-blue-400'}`}
              disabled={activeQuestion === 0}
            >
              Previous
            </button>
            {activeQuestion === quizData.totalQuestions - 1 ? (
              <button className='bg-red-500 p-2 rounded-md mx-4' onClick={handleFinishQuiz}>
                Finish
              </button>
            ) : (
              <button className='bg-blue-500 p-2 rounded-md mx-4' onClick={handleFinishQuiz}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
