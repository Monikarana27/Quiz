import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Result = ({ results, finalScore }) => {
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  // Calculate percentage
  const percentage = (finalScore / results.length) * 100;
  let interpretation = '';
   
  if (percentage <= 50) {
    interpretation = `
    ●	Participants who score low on situational judgment may struggle with accurately assessing situational cues, considering relevant factors, and determining appropriate courses of action.
    ●	They may exhibit difficulties in understanding the context of the presented scenarios, prioritizing information effectively, or discerning the logical sequence of actions.
    ●	Their performance suggests challenges in applying sound judgment and reasoning skills to real-world situations, which may impact their ability to make optimal decisions in varied contexts.
    `;
  }
  else {
    interpretation = `
    ●	Participants who score high on situational judgment demonstrate strong abilities in understanding complex situations, assessing multiple factors, and making effective decisions.
    ●	They are likely adept at identifying relevant information from the given stimuli, organizing it logically, and determining the correct sequence of actions or responses.
    ●	Their performance reflects a nuanced understanding of context-specific scenarios and the ability to apply appropriate judgment and reasoning to navigate them successfully.
    `;
   
  }

 
  return (
    <div className='mx-4 my-4  border p-4 rounded-md bg-gray-200'>
      <Link to="/" className='bg-blue-500 text-white px-2 rounded-md ml-2 py-1'>Home</Link>
      <h1 className='text-center text-semibold font-bold text-3xl'>Quiz Results</h1>
      <p className='text-center text-xl bg-green-400 rounded-md'>Final Score: {finalScore} ({percentage.toFixed(2)}%)</p>
      <p className='text-bold'><strong>Interpretation:</strong></p>

      <pre class="whitespace-pre-wrap break-words">
          {interpretation}
      </pre>
      <button  className="bg-blue-400 text-white py-1 px-2 rounded-md mt-4" onClick={() => setShowCorrectAnswers(!showCorrectAnswers)}>
        {showCorrectAnswers ? 'Hide Detailes Result' : 'Show Detailed Result'}
      </button>
      {showCorrectAnswers &&
      <div>
        {results.map((result, index) => (
          <div key={index} className="my-4 border p-4 rounded-md bg-purple-300">
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