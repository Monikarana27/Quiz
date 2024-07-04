import React from 'react';
import { Link } from 'react-router-dom';

const ResultScreen = ({ results, totalQuestions, finalScore }) => {
  return (
    <div className='mx-4 my-4'>
      <Link to="/" className='bg-blue-500 text-white px-2 rounded-md ml-2  py-1'>Home</Link>
      <h1 className='text-center text-semibold'>Quiz Results</h1>
      <p className='text-center'>Final Score: {finalScore}</p>
      <p className='text-center'>Total questions : {totalQuestions}</p>

      <table className="min-w-full border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300">Question No.</th>
            <th className="border border-gray-300">Question</th>
            <th className="border border-gray-300">User Answer</th>
            <th className="border border-gray-300">Correct Answer</th>
            <th className="border border-gray-300">Explanation</th>

            <th className="border border-gray-300">Is Correct</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.questionNo}>
              <td className="border border-gray-300">{result.Sno}</td>
              <td className="border border-gray-300">{result.question}</td>
              <td className="border border-gray-300">{result.userAnswer}</td>
              <td className="border border-gray-300">{result.correctAnswer}</td>
              <td className="border border-gray-300">{result.explanation}</td>
              <td className="border border-gray-300">{result.isCorrect ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ResultScreen;
