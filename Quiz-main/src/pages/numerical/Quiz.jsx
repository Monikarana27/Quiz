import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quiz2 } from '../../db/numerical_ques_db/numerical';
import Result from './Result';
import { initial_result } from './store_result';

const Quiz = () => {
  const quizData = quiz2;

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [inputAnswer, setInputAnswer] = useState("");
  const [isFinish, setIsFinish] = useState(false);
  const [result, setResult] = useState(initial_result);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(900); // 15 minutes = 900 seconds

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

  const handleNext = () => {
    setActiveQuestion((prevQuestion) => Math.min(prevQuestion + 1, quizData.totalQuestions - 1));
    setSelectedAnswer(null);
    setInputAnswer("");
  };

  const handlePrevious = () => {
    setActiveQuestion((prevQuestion) => Math.max(prevQuestion - 1, 0));
    setSelectedAnswer(null);
    setInputAnswer("");
  };

  const handleOptionSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleInputChange = (e) => {
    setInputAnswer(e.target.value);
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
      } else if (question.type === 'Floating Type' && question.user_ans.trim().toLowerCase() === question.correct_ans.trim().toLowerCase()) {
        count++;
        return { ...question, isCorrect: 'Yes' };
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
    const answer = quizData.questions[index].type === 'Floating Type' ? inputAnswer : selectedAnswer;
    const updatedQuestion = {
      Sno: index + 1,
      ques: quizData.questions[index].question,
      correct_ans: quizData.questions[index].correctAnswer,
      user_ans: answer || '',
      explanation: quizData.questions[index].explanation,
    };
    updatedResult[index] = updatedQuestion;
    setResult(updatedResult);
    handleNext();
  };

  // Calculate progress percentage
  const progress = ((activeQuestion + 1) / quizData.totalQuestions) * 100;

  return (
    <div className="bg-purple-300 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[1000px] overflow-hidden">
        {isFinish ? (
          <Result results={result} finalScore={score} />
        ) : (
          <div>
            <h1 className="text-center font-medium text-4xl py-2 font-serif">{quizData.quizName}</h1>
            <p className="text-center text-2xl py-2 font-serif">Category: {quizData.category}</p>
            <div className="w-full flex justify-center">
              <div className="text-white px-3 py-1 rounded-md text-center mb-4 shadow-lg bg-blue-500">
                <span className="text-lg font-bold">Time Remaining:</span>
                <span className="ml-2 text-2xl font-semibold">
                  {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
                </span>
              </div>
            </div>

            <section className="flex">
              <div className="w-[75%] overflow-hidden">
                {quizData.questions.map((question, index) => (
                  <div key={index} style={{ display: index === activeQuestion ? 'block' : 'none' }}>
                    <div className="text-sm leading-6 mx-4">
                      <img
                        src={question?.attachment}
                        alt={`Question ${index + 1}`}
                        style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '1rem' }}
                      />
                    </div>
                    <h3 className="font-bold text-l px-8 py-4">Q{index + 1}: {question.question}</h3>
                    {question.type === 'MCQ' && (
                      <div className="pl-8">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex}>
                            <label className="block text-lg">
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
                    )}
                    {question.type === 'Floating Type' && (
                      <div className="pl-8">
                        <input
                          type="text"
                          className="border-2 mx-8 border-slate-300 text-lg"
                          value={inputAnswer}
                          onChange={handleInputChange}
                        />
                      </div>
                    )}
                  </div>
                ))}

                <div className="text-white flex space-x-8 pt-8 justify-center">
                  <button
                    onClick={handlePrevious}
                    className={`p-2 rounded-md ml-4 ${activeQuestion === 0 ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-400 text-white hover:bg-blue-500'}`}
                    disabled={activeQuestion === 0}
                  >
                    Previous
                  </button>

                  <button
                    className="bg-green-500 text-white p-2 rounded-md mx-4 hover:bg-blue-600 focus:outline-none"
                    onClick={() => handleSaveAns(activeQuestion)}
                  >
                    {activeQuestion === quizData.totalQuestions - 1 ? 'Save' : 'Save & Next'}
                  </button>
                </div>
              </div>

              <div className="w-[25%] bg-white rounded-lg shadow-lg p-4 flex flex-col items-center" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <div className="flex flex-col justify-between h-full">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">Question Progress</h2>
                    <div className="bg-gray-200 w-full h-2 rounded-full">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="text-sm text-center mt-2">{`${Math.round(progress)}% Complete`}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {Array.from({ length: Math.ceil(quizData.totalQuestions / 4) }, (_, groupIndex) => (
                      <div key={groupIndex} className="flex flex-wrap gap-2 mb-2">
                        {Array.from({ length: 4 }, (_, index) => {
                          const questionNumber = groupIndex * 4 + index;
                          if (questionNumber < quizData.totalQuestions) {
                            return (
                              <div
                                key={questionNumber}
                                className="w-10 h-10 flex items-center justify-center text-white rounded-md text-lg cursor-pointer shadow-md"
                                style={{ backgroundColor: questionNumber === activeQuestion ? '#3B82F6' : '#34D399' }}
                                onClick={() => handleQuesNavigation(questionNumber)}
                              >
                                {questionNumber + 1}
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </div>
                    ))}
                  </div>

                  <button
                    className='bg-red-500 mx-auto px-4 py-2 rounded-md text-white font-semibold shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 ease-in-out mt-auto'
                    style={{ width: '150px' }}
                    onClick={handleScore}
                  >
                    Finish
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
