import React, { useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { quiz4 } from '../../db/deduction_ques_db/deduction';
import Result from './Result';
import {initial_result} from './store_result'

const Quiz = () => {
    const quizData = quiz4;

    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
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
    };
  
    const handlePrevious = () => {
      setActiveQuestion((prevQuestion) => Math.max(prevQuestion - 1, 0));
      setSelectedAnswer(null);
    };
  
    const handleOptionSelect = (option) => {
      setSelectedAnswer(option);
    };
  
    const handleQuesNavigation=(index)=>{
        setActiveQuestion((index))
    }

    const handleScore = () => {
      let count = 0;
      const updatedResult = result.map(question => {
        if (question.user_ans === question.correct_ans) {
          count++;
          return { ...question, isCorrect: "Yes" };
        } 
        else if (question.user_ans.trim() === "") {
          return { ...question, isCorrect: "Skipped" };
        }
        else {
          return { ...question, isCorrect: "No" };
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
        user_ans: selectedAnswer || "",
        explanation: quizData.questions[index].explanation,
      };
      updatedResult[index] = updatedQuestion;
      setResult(updatedResult);
      handleNext();
    };
    
    
  
    return (
      <div>
        {isFinish ? (
          <Result results={result}  finalScore={score} />
        ) : (
          <div>
            <h1 className='text-center font-medium text-xl py-2'>{quizData.quizName}</h1>
            <p className='text-center text-sm py-2'>Category: {quizData.category}</p>
            <div className='w-full flex justify-center'>

            <div className="text-white px-1 rounded-sm text-center mb-4 bg-blue-500 w-fit">
              Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
            </div>
            </div>
            <section className='flex'>
            <div className='w-[75%]'>
              {quizData.questions.map((question, index) => (
                <div key={index} style={{ display: index === activeQuestion ? 'block' : 'none' }}>
                  {question.type === "MCQ" && (
                    <>
                      <div className='text-sm leading-6 mx-4'>{question.attachement}</div>
                      <span>
                        <h3 className='font-bold px-8 py-4'>Q{index + 1}: {question.question}</h3>
                      </span>
                      <div className='pl-8'>
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex}>
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
              <div className='text-white flex space-x-8 pt-8'>
                <button
                  onClick={handlePrevious}
                  className={`p-2 rounded-md ml-4 ${activeQuestion === 0 ? 'bg-gray-400' : 'bg-blue-400'}`}
                  disabled={activeQuestion === 0}
                >
                  Previous
                </button>
                {activeQuestion === quizData.totalQuestions - 1 ? (
                  <button className='bg-blue-500 p-2 rounded-md mx-4' onClick={()=>handleSaveAns(activeQuestion)}>
                    Save 
                  </button>
                ) : (
                  <button className='bg-blue-500 p-2 rounded-md mx-4' onClick={()=>handleSaveAns(activeQuestion)}>
                    Save & Next
                  </button>
                )}
              </div>
            </div>

               
                {/* Questions navigation */}
                <div className="w-[25%] h-[500px]  flex flex-col items-center justify-between">
                  <div className="flex gap-4 flex-wrap">
                    {Array.from({ length: quizData.totalQuestions }, (_, index) => (
                      <div
                        key={index}
                        className={`box w-10 h-10 flex items-center justify-center text-white rounded-md text-xl cursor-pointer ${index === activeQuestion ? 'bg-blue-500' : 'bg-green-400'}`}
                        onClick={() => handleQuesNavigation(index)}
                      >
                        {index + 1}
                      </div>
                    ))}
              </div>
                <button className='bg-red-500 w-[50%] p-2 rounded-md text-white' onClick={handleScore}>
                    Finish
                </button>
                </div>


            </section>
          </div>
        )}
      </div>
    );
  };

export default Quiz