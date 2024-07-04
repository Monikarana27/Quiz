import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quiz7 } from '../../db/MBTI/MBTI';
import Result from './Result';
import { Progress } from 'antd';

const Quiz = () => {
  const quizData = quiz7;
  const [activeQuestions, setActiveQuestions] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quizData.questions.length).fill(null));
  const [isFinish, setIsFinish] = useState(false);
  const [result, setResult] = useState([]);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState({
    O: 0,
    C: 0,
    E: 0,
    A: 0,
    N: 0,
  });

  const [mbtiType, setMbtiType] = useState('');

  const navigate = useNavigate();
  const questionRefs = useRef([]);

  const handleOptionSelect = (option, index) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[index] = option;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleSaveAns = () => {
    const updatedResult = [...result];
    const updatedScore = { ...score };
    for (let i = activeQuestions; i < activeQuestions + 6 && i < quizData.totalQuestions; i++) {
      let anscal = 0;
      if (quizData.questions[i].scoretype === 'normal') {
        anscal = selectedAnswers[i];
      } else if (quizData.questions[i].scoretype === 'reverse') {
        if (selectedAnswers[i] === 0 || selectedAnswers[i] === null) {
          anscal = 0;
        } else {
          anscal = 8 - selectedAnswers[i];
        }
      }

      const updatedQuestion = {
        Sno: i + 1,
        ques: quizData.questions[i].question,
        ans: anscal,
        type: quizData.questions[i].type,
      };
      updatedResult.push(updatedQuestion);

      const s = anscal;

      switch (quizData.questions[i].type) {
        case 'Openness':
          updatedScore.O += s;
          break;
        case 'Conscientiousness':
          updatedScore.C += s;
          break;
        case 'Extraversion':
          updatedScore.E += s;
          break;
        case 'Agreeableness':
          updatedScore.A += s;
          break;
        case 'Neuroticism':
          updatedScore.N += s;
          break;
        default:
          break;
      }
    }
    setScore(updatedScore);
    setResult(updatedResult);
    const nextQuestion = activeQuestions + 6;
    setActiveQuestions(nextQuestion >= quizData.totalQuestions ? quizData.totalQuestions : nextQuestion);
    setProgress(progress + 12.5);

    if (activeQuestions >= 42) {
      setIsFinish(true);
      convertToMbti(updatedScore);
    }
  };

  const convertToMbti = (score) => {
    const { O, C, E, A, N } = score;
    const mbti = [
      E > 24 ? 'E' : 'I',
      O > 24 ? 'N' : 'S',
      (A + C) > 48 ? 'F' : 'T',
      C > 24 ? 'J' : 'P',
    ].join('');
    setMbtiType(mbti);
  };

  return (
    <div>
      {isFinish ? (
        <Result results={result} finalScore={score} mbtiType={mbtiType} />
      ) : (
        <div>
          <h1 className="text-center font-medium text-xl py-2">{quizData.quizName}</h1>
          <p className="text-center text-sm py-2">Category: {quizData.category}</p>
          <div className='flex justify-center'>
            <div className='w-[60%] py-12'>
              <Progress percent={progress} strokeColor={'#22C55E'} />
            </div>
          </div>
          <div className="flex">
            <div className="w-full">
              {quizData.questions.map((question, index) => (
                <div key={index} ref={ref => questionRefs.current[index] = ref} style={{ display: index >= activeQuestions && index < activeQuestions + 6 ? 'block' : 'none' }}>
                  <div className='flex justify-center'>
                    <div className={`w-[60%] p-10 `}>
                      <span className="block mb-4 text-center text-2xl"><span>Q{index+1}: </span>{question.question}</span>
                      <div className="flex justify-between items-center">
                        <span className="text-xl text-green-500">Agree</span>
                        {Array.from({ length: 7 }, (_, i) => i + 1).map(option => (
                          <div
                            key={option}
                            className={`flex flex-col items-center ${
                              selectedAnswers[question.Sno] === option ? 'opacity-100' : 'opacity-80'
                            } cursor-pointer`}
                            onClick={() => handleOptionSelect(option, index)}
                          >
                            <div
                              className={`w-[3rem] h-[3rem] rounded-full hover:bg-green-400 border-[3px] ${
                                selectedAnswers[index] === option ? 'border-green-500' : ''
                              } ${
                                selectedAnswers[index] === option ? 'bg-green-400' : ''
                              }`}
                            ></div>
                          </div>
                        ))}
                        <span className="text-xl text-purple-700">Disagree</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-white flex justify-center  py-12">
                {activeQuestions < 42 ? (
                  <button className="bg-green-500 p-4 rounded-full mx-4" onClick={() => handleSaveAns(activeQuestions)}>
                    Save & Next
                  </button>
                ) : (
                  <button className="bg-green-500 p-4 rounded-full mx-4" onClick={() => handleSaveAns(activeQuestions)}>
                    Save 
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
