import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Result = ({ results, finalScore }) => {
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  // Calculate percentage
  const percentage = (finalScore / results.length) * 100;

  // Determine the percentile range and interpretation text
  let interpretation = '';
  let jobsSuited = '';
  if (percentage <= 50) {
    interpretation = 'This score indicates that your performance in understanding and manipulating language effectively, identifying relationships between words, completing analogies, recognizing synonyms or antonyms, and evaluating logical patterns may be below average. However, it\'s essential to remember that scores on such tests are not definitive measures of intelligence or capability and should be interpreted within the context of the specific test and its criteria. With targeted practice and improvement efforts, you can work towards enhancing your verbal reasoning abilities and potentially achieve higher scores in future assessments.';
    jobsSuited = [
      'Administrative assistant',
      'Data entry clerk',
      'Retail work associate',
      'Production worker',
      'Countermer service representative (entry-level)'
    ];
  } else if (percentage > 50 && percentage <= 90) {
    interpretation = 'This score indicates exceptional proficiency in verbal skills. This high score suggests a strong ability to understand and manipulate language effectively, identify relationships between words, complete analogies, recognize synonyms or antonyms, and evaluate logical patterns in sentences or passages. Individuals with this level of verbal reasoning aptitude typically possess excellent communication skills, critical thinking abilities, and a keen understanding of language nuances.';
    jobsSuited = [
      'Lawyers',
      'HR specialist',
      'Public relation specialist',
      'Content writers',
      'Journalist',
      'Communication Executive'
    ];
  } else {
    interpretation = 'This high score suggests an outstanding level of verbal reasoning aptitude, typically possessing excellent communication skills, critical thinking abilities, and a keen understanding of language nuances.';
    jobsSuited = [
      'University professor',
      'Editor-in-chief',
      'Research scientist',
      'Creative director',
      'Marketing strategist',
      'Consultant'
    ];
  }

  return (
    <div className='mx-4 my-4'>
      <Link to="/" className='bg-blue-500 text-white px-2 rounded-md ml-2 py-1'>Home</Link>
      <h1 className='text-center text-semibold'>Quiz Results</h1>
      <p className='text-center'>Final Score: {finalScore} ({percentage.toFixed(2)}%)</p>
      <p className=''><strong>Interpretation:</strong></p>
      <p> {interpretation}</p>
      <p className=''><strong>Jobs Suited:</strong></p>
      <ul>
        {jobsSuited.map((job, index) => (
          <li key={index}>{job}</li>
        ))}
      </ul>
      <button  className="bg-blue-400 text-white py-1 px-2 rounded-md mt-4" onClick={() => setShowCorrectAnswers(!showCorrectAnswers)}>
        {showCorrectAnswers ? 'Hide Detailes Result' : 'Show Detailed Result'}
      </button>
      {showCorrectAnswers &&
      <div>
        {results.map((result, index) => (
          <div key={index} className="my-4 border p-4 rounded-md">
            <p><strong>Question: </strong>{result.ques}</p>
             <p><strong>Correct Answer: </strong>{result.correct_ans}</p>
            <p><strong>User's Answer: </strong>{result.user_ans}</p>
            <p><strong>Explanation: </strong>{result.explanation}</p>
            <p><strong>Is Correct: </strong><span style={{ color: result.isCorrect === 'Yes' ? 'green' : (result.isCorrect === 'No' ? 'red' : 'grey') }}>{result.isCorrect}</span></p>
          </div>
        ))}
      </div>
    }
    </div>
  );
};

export default Result;
