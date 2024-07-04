import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quiz1 } from '../../db/verbal_reasoning_ques_db/verbal_reasoning';
import Result from './Result';
import { initial_result } from './store_result';

const Quiz = () => {
  const quizData = quiz1;

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-purple-100 flex items-center justify-center">
      {isFinish ? (
        <Result results={result} finalScore={score} />
      ) : (
        <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 bg-purple-600 text-white text-center font-bold text-2xl">
            {quizData.quizName}
          </div>
          <p className="text-center text-white py-2 px-4 bg-gradient-to-r from-purple-500 to-green-400 border border-purple-300 rounded-md">
            Category: {quizData.category}
          </p>

          <div className="flex justify-between px-4 py-2 bg-gray-200 text-gray-700 font-bold">
            <div>Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</div>
            <div>Score: {score}</div>
          </div>

          <div className="flex">
            <div className="w-3/4 p-4">
              {quizData.questions.map((question, index) => (
                <div key={index} style={{ display: index === activeQuestion ? 'block' : 'none' }}>
                  {question.type === 'MCQ' && (
                    <>
                      <div className="p-4 bg-purple-200 rounded-lg shadow-md mb-4">
                        {question.attachement}
                      </div>
                      <h3 className="font-bold mb-4">Q{index + 1}: {question.question}</h3>
                      <div>
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="mb-2">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                className="form-radio text-purple-600"
                                value={option}
                                onChange={() => handleOptionSelect(option)}
                                checked={selectedAnswer === option}
                              />
                              <span className="ml-2">{option}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePrevious}
                  className={`px-4 py-2 rounded-md text-white ${activeQuestion === 0 ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
                  disabled={activeQuestion === 0}
                >
                  Previous
                </button>
                {activeQuestion === quizData.totalQuestions - 1 ? (
                  <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white" onClick={() => handleSaveAns(activeQuestion)}>
                    Save
                  </button>
                ) : (
                  <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-white" onClick={() => handleSaveAns(activeQuestion)}>
                    Save & Next
                  </button>
                )}
              </div>
            </div>

            <div className="w-1/4 p-4 bg-purple-100 border-l border-purple-300">
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: quizData.totalQuestions }, (_, index) => (
                  <button
                    key={index}
                    className={`w-full h-10 rounded-md text-white ${index === activeQuestion ? 'bg-blue-500' : 'bg-green-400 hover:bg-green-500'}`}
                    onClick={() => handleQuesNavigation(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button className="bg-green-500 hover:bg-green-600 w-full mt-4 p-2 rounded-md text-white" onClick={handleScore}>
                Finish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
