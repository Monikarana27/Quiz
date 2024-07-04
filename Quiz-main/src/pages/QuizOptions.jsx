import React from 'react'
import {allquiz} from '../db/AllQuiz'
import QuizCard from '../components/QuizCard'

const QuizOptions = () => {
  return (
    
    <div>
        <h1 className='text-center pt-4 md:text-4xl text-xl font-semibold text-slate-900'>Competency Evaluation Center </h1>
          <h2 className='text-center py-2 md:text-2xl text-lg font-semibold text-slate-700'>Assess Your Skills and Knowledge</h2>
        <div className='flex justify-evenly flex-wrap'>
            {
                allquiz.map((quiz)=>
                (<QuizCard key={quiz.quizId} quizDetails={quiz}/>)
                )
            }
        </div>
    </div>
  )
}

export default QuizOptions