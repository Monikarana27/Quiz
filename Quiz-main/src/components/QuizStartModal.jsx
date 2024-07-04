import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuizStartModal = ({ closeModal , quizDetails }) => {

    const navigate = useNavigate()

    const handleStart = () =>{
        navigate(`/quiz/${quizDetails.endpoint}`)
    }


  return (
    <>
      <div className='fixed top-0 left-0 bg-black w-full h-full bg-opacity-50 flex justify-center items-center'>
        <div className='bg-slate-50 rounded-lg w-11/12 md:w-1/2 lg:w-1/3'>
          <div className='flex flex-col p-4'>
            <h1 className='text-2xl font-semibold text-slate-800'>{quizDetails.quiz}</h1>
            <p>Quiz category : {quizDetails.category}</p>
            <p>Quiz Timing : {quizDetails.totalTime}</p>
            
            <div className='flex flex-row justify-end mt-2'>
              <button
                className='bg-red-500 rounded-md px-4 py-2 text-slate-50'
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className='bg-green-500 rounded-md px-4 py-2 text-slate-50 ml-2'
                onClick={handleStart}
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizStartModal;
