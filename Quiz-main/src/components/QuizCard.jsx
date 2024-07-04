import React, { useState } from 'react';
import QuizStartModal from './QuizStartModal';  // Adjust the path accordingly

const QuizCard = ({ quizDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = (isOpen) => {
    setIsModalOpen(isOpen);
  };

  return (
    <div className='w-[300px] bg-blue-50 p-4 m-4 rounded-lg shadow-md hover:shadow-lg transition duration-300'>
      <p className='text-lg text-gray-800 mb-2'>Assessment</p>
      <p className='text-xl font-semibold text-gray-800 mb-2'>{quizDetails.quiz}</p>
      <p className='text-sm text-gray-600 mb-4'>Category: {quizDetails.category}</p>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue'
        onClick={() => handleModal(true)}
      >
        Take Test
      </button>

      {isModalOpen && (
        <QuizStartModal
          closeModal={() => handleModal(false)}
          quizDetails={quizDetails}
        />
      )}
    </div>
  );
};

export default QuizCard;
