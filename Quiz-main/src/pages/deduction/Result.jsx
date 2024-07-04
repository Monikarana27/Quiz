import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Result = ({ results, finalScore }) => {
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  // Calculate percentage
  const percentage = (finalScore / results.length) * 100;
  //Interpretation
   
    let interpretation = '';
   
    if (percentage <= 50) {
      interpretation = `
      ●	Participants who score low on the deduction test may struggle with identifying logical patterns, drawing conclusions from given information and making accurate deductions.
      ●	They might have difficulty recognizing relevant details within the paragraphs, connecting them logically, and applying deductive reasoning principles to arrive at the correct answers.
      ●	Their performance suggests challenges in systematically analyzing information, inferring relationships, and extrapolating logical implications, which could impact their ability to solve problems requiring deductive reasoning.
      `;
    }
    else {
      interpretation = `
      ●	Participants who score high on the deduction test demonstrate strong abilities in identifying logical patterns, making accurate inferences, and drawing valid conclusions from given information.
      ●	They are likely adept at recognizing relevant details within the paragraphs, synthesizing them coherently, and applying deductive reasoning principles effectively to arrive at the correct answers.
      ●	Their performance reflects a capacity for systematic and analytical thinking, as well as the ability to recognize and apply logical rules or principles to solve problems, which is indicative of strong deductive reasoning skills.
      `;
     
    }
 
  return (
    <div className='mx-4 my-4'>
      <Link to="/" className='bg-blue-500 text-white px-2 rounded-md ml-2 py-1'>Home</Link>
      <h1 className='text-center text-semibold'>Quiz Results</h1>
      <p className='text-center'>Final Score: {finalScore} ({percentage.toFixed(2)}%)</p>
      <p className=''><strong>Interpretation:</strong></p>
      <pre class="whitespace-pre-wrap break-words">
          {interpretation}
      </pre>
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
