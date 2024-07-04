import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quiz3 } from '../../db/situational_judgement_db/situational_judgement';
import Result from './Result';
import { initial_result } from './store_result';

const Quiz = () => {
  const quizData = quiz3;

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFinish, setIsFinish] = useState(false);
  const [result, setResult] = useState(initial_result);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(600);

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
  };

  const handlePrevious = () => {
    setActiveQuestion((prevQuestion) => Math.max(prevQuestion - 1, 0));
    setSelectedAnswer(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedAnswer(option);
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

  return (
    <div className='bg-purple-300 min-h-screen flex flex-col items-center overflow-hidden'>
      {isFinish ? (
        <Result results={result} finalScore={score} />
      ) : (
        <div>
          <h1 className="text-center font-pacifico font-bold text-3xl py-2 bg-purple-400 border rounded-md mr-2 ml-2 mt-2">{quizData.quizName}</h1>
          <p className="text-center font-medium text-slate-800 py-2">Category: {quizData.category}</p>
          <div className='w-full flex justify-center'>
            <div className="text-black font-medium px-1 rounded-sm text-center mb-4 bg-red-500 w-fit mr-auto ml-8">
              Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
            </div>
          </div>
          <section className="flex">
            <div className="w-[75%] flex flex-col items-center ml-8">
              {quizData.questions.map((question, index) => (
                <div key={index} style={{ display: index === activeQuestion ? 'block' : 'none' }} className="border border-black p-4 rounded-md mb-4 bg-gray-200 -mb-6">
                  {question.type === 'MCQ' && (
                    <>
                      <span>
                        <h3 className="font-bold px-8 py-4">Q{index + 1}: {question.question}</h3>
                      </span>
                      <pre className="text-sm font-bold leading-6 mx-4 ">{question.attachment}</pre>
                      <div className="pl-8">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="my-2 p-2 border rounded-md font-bold" style={{ border: '1px solid #000', backgroundColor: '#fff' }}>
                            <label>
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
                    </>
                  )}
                  {/* Add similar conditionals for other types of questions if needed */}
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
                  <button className="bg-blue-500 p-2 rounded-md mx-4" onClick={() => handleSaveAns(activeQuestion)}>
                    Save 
                  </button>
                ) : (
                  <button className="bg-green-600 p-2 rounded-md mx-4" onClick={() => handleSaveAns(activeQuestion)}>
                    Save & Next
                  </button>
                )}
              </div>
            </div>

            {/* Questions navigation */}
            <div className="w-[25%] h-[450px] flex flex-col items-center justify-between ml-4 mr-2 border border-black p-4 rounded-md mb-4 bg-gray-200">
              <div className="flex gap-4 flex-wrap grid grid-cols-5 gap-4 justify-center mr-4">
                {Array.from({ length: quizData.totalQuestions }, (_, index) => (
                  <div
                    key={index}
                    className={`box w-10 h-10 flex items-center justify-center text-white rounded-md text-xl cursor-pointer ${index === activeQuestion ? 'bg-blue-500' : 'bg-green-400'}`}
                    style={{ border: '1px solid #000', margin: '2px', padding: '5px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => handleQuesNavigation(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              <button className="bg-red-500 w-[50%] p-2 rounded-md text-white" onClick={handleScore}>
                Finish
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Quiz;
