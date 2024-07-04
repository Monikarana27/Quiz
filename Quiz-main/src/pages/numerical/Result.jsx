import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Result = ({ results, finalScore }) => {
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);


  // Determine the range and interpretation text
  let interpretation = '';
  // let jobsSuited = '';
  if (finalScore>=0 && finalScore<=5) {
    interpretation = `A total score of ${finalScore}  points indicates a foundational understanding of comparative analysis within the context of trip logistics. While successful in this specific dimension, there are notable challenges in other numeracy dimensions assessed. The individual may face difficulties in interpreting and analyzing numerical data related to call center performance metrics, as well as struggles in arithmetic operations and analytical thinking when examining monthly sales data. The score suggests room for improvement in quantitative analysis, percentage calculations, and analytical reasoning. Targeted practice in these areas would contribute to a more comprehensive and well-rounded enhancement of numerical skills.`;
    // jobsSuited = [
    //   'Administrative assistant',
    //   'Data entry clerk',
    //   'Retail work associate',
    //   'Production worker',
    //   'Countermer service representative (entry-level)'
    // ];
  } else if (finalScore >= 6 && finalScore <= 10) {
    interpretation = `A total score of ${finalScore} points reflects a commendable proficiency in various numeracy dimensions assessed. The individual has demonstrated strong capabilities in quantitative analysis, percentage calculations, arithmetic operations, and analytical thinking. This high score indicates a robust foundation in mathematical skills across different scenarios, such as call center performance metrics, monthly sales data, and trip logistics. The individual exhibits a keen understanding of numerical data interpretation and displays advanced analytical reasoning skills. This score suggests a high level of comfort and competence in handling mathematical concepts, showcasing an overall mastery of basic numeracy and mathematics skills.`
    // jobsSuited = [
    //   'Lawyers',
    //   'HR specialist',
    //   'Public relation specialist',
    //   'Content writers',
    //   'Journalist',
    //   'Communication Executive'
    // ];
  } else if(finalScore >= 11 && finalScore <= 14) {
    interpretation = `An outstanding total score of ${finalScore} points reflects an exceptional level of proficiency in numeracy and mathematics across diverse scenarios. The individual has demonstrated excellence in quantitative analysis, percentage calculations, arithmetic operations, and analytical thinking. This high score indicates not only a strong foundation in mathematical skills but also an advanced ability to apply them in practical contexts, such as call center performance metrics, monthly sales data, and trip logistics. The individual showcases a sophisticated understanding of numerical data interpretation, displaying advanced analytical reasoning skills. This exceptional score suggests a high level of comfort, competence, and mastery of mathematical concepts, showcasing an exceptional aptitude for numeracy and mathematics skills.`
    // jobsSuited = [
    //   'University professor',
    //   'Editor-in-chief',
    //   'Research scientist',
    //   'Creative director',
    //   'Marketing strategist',
    //   'Consultant'
    // ];
  }

  return (
    <div className='mx-4 my-4'>
      <Link to="/" className='bg-blue-500 text-white px-2 rounded-md ml-2 py-1'>Home</Link>
      <h1 className='text-center text-semibold'>Quiz Results</h1>
      <p className='text-center'>Final Score: {finalScore} </p>
      <p className=''><strong>Interpretation:</strong></p>
      <p> {interpretation}</p>
      {/* <p className=''><strong>Jobs Suited:</strong></p>
      <ul>
        {jobsSuited.map((job, index) => (
          <li key={index}>{job}</li>
        ))}
      </ul> */}
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
