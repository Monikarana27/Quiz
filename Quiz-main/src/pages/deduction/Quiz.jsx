import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quiz4 } from '../../db/deduction_ques_db/deduction';
import Result from './Result';
import { initial_result } from './store_result';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Quiz = () => {
  const quizData = quiz4;

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isFinish, setIsFinish] = useState(false);
  const [result, setResult] = useState(initial_result);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(1200);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        setIsFinish(true);
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveQuestion((prevQuestion) => Math.min(prevQuestion + 1, quizData.totalQuestions - 1));
    setSelectedAnswer(null);
    setSelectedAnswerIndex(null);
  };

  const handlePrevious = () => {
    setActiveQuestion((prevQuestion) => Math.max(prevQuestion - 1, 0));
    setSelectedAnswer(null);
    setSelectedAnswerIndex(null);
  };

  const handleOptionSelect = (option, index) => {
    setSelectedAnswer(option);
    setSelectedAnswerIndex(index);
  };

  const handleQuesNavigation = (index) => {
    setActiveQuestion(index);
  };

  const handleScore = () => {
    let count = 0;
    const updatedResult = result.map((question) => {
      if (question.user_ans === question.correct_ans) {
        count++;
        return { ...question, isCorrect: 'Yes' };
      } else if (question.user_ans.trim() === '') {
        return { ...question, isCorrect: 'Skipped' };
      } else {
        return { ...question, isCorrect: 'No' };
      }
    });
    setScore(count);
    setResult(updatedResult);
    setIsFinish(true);
  };

  const handleSaveAns = (index) => {
    const updatedResult = [...result];
    const updatedQuestion = {
      Sno: index + 1,
      ques: quizData.questions[index].question,
      correct_ans: quizData.questions[index].correctAnswer,
      user_ans: selectedAnswer || '',
      explanation: quizData.questions[index].explanation,
    };
    updatedResult[index] = updatedQuestion;
    setResult(updatedResult);
    handleNext();
  };

  const timerPercentage = (timer / 1200) * 100;
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="bg-purple-300 min-h-screen flex flex-col items-center justify-center">
      {isFinish ? (
        <Result results={result} finalScore={score} />
      ) : (
        <div className="w-full max-w-5xl p-4 bg-white shadow-md rounded-lg flex">
          {/* Left Sidebar for Questions */}
          <div className="w-1/4 p-4 flex flex-col items-center">
            <h1 className='text-center bg-white-500 font-medium text-xl py-2'>{quizData.quizName}</h1>
            <p className='text-center text-sm font-medium text-lg py-2'>Category: {quizData.category}</p>
            <div className='w-full mt-4'>
              <div className="w-full flex justify-center mb-4">
                <div className="w-24 h-24">
                  <CircularProgressbar
                    value={timerPercentage}
                    text={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                    styles={buildStyles({
                      textSize: '16px',
                      pathColor: `rgba(255, 0, 0, ${timerPercentage / 100})`,
                      textColor: 'black',
                      trailColor: 'white',
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {quizData.questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 flex items-center justify-center text-white rounded-md text-xl cursor-pointer ${index === activeQuestion ? 'bg-blue-500' : 'bg-green-400'}`}
                    onClick={() => handleQuesNavigation(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Quiz Content */}
          <div className="w-3/4 p-4 flex flex-col items-center">
            <section className="flex flex-col items-center w-full">
              <div className="w-full mb-4 p-4 rounded-lg shadow-md">
                <div>
                  {quizData.questions.map((question, index) => (
                    <div key={index} style={{ display: index === activeQuestion ? 'block' : 'none' }}>
                      {question.type === 'MCQ' && (
                        <>
                          <div className="text-sm p-2 bg-purple-300 leading-6 rounded-lg">{question.attachement}</div>
                          <h3 className="font-bold py-4">Q{index + 1}: {question.question}</h3>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
                {quizData.questions.map((question, index) => (
                  <div key={index} style={{ display: index === activeQuestion ? 'block' : 'none' }}>
                    {question.type === 'MCQ' && (
                      <>
                        <div className="pl-8">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-2 rounded-lg mb-2 cursor-pointer ${selectedAnswerIndex === optionIndex ? 'bg-blue-200 border border-blue-500' : 'bg-gray-200'}`}
                              onClick={() => handleOptionSelect(option, optionIndex)}
                            >
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  value={option}
                                  onChange={() => handleOptionSelect(option, optionIndex)}
                                  checked={selectedAnswer === option}
                                  className="mr-2"
                                />
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
                <div className="text-white flex space-x-8 pt-8">
                  <button
                    onClick={handlePrevious}
                    className={`p-2 rounded-md ml-4 ${activeQuestion === 0 ? 'bg-gray-400' : 'bg-blue-400'}`}
                    disabled={activeQuestion === 0}
                  >
                    Previous
                  </button>
                  {activeQuestion === quizData.totalQuestions - 1 ? (
                    <button className="bg-blue-600 p-2 rounded-md mx-4" onClick={() => handleSaveAns(activeQuestion)}>
                      Save
                    </button>
                  ) : (
                    <button className="bg-green-600 p-2 rounded-md mx-4" onClick={() => handleSaveAns(activeQuestion)}>
                      Save & Next
                    </button>
                  )}
                </div>
              </div>
            </section>
            <button className="bg-red-800 w-[50%] p-2 rounded-md text-white mt-4" onClick={handleScore}>
              Finish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;