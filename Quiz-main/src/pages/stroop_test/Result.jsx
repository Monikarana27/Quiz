import React from 'react'

const Result = ({correct,wrong}) => {
  let interpretation  = ''
  
  return (
    <div className='text-2xl text-semibold text-blue-800 text-center'>Results
        <p>Correct: {correct}</p>
        <p>Wrong: {wrong}</p>
    </div>
  )
}

export default Result