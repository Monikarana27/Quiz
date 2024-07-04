import React, { useState } from 'react';

const LikertScale = ({question ,active}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className='flex justify-center'>
      <div className={`w-[60%] p-4 ${active ? 'opacity-100' : 'opacity-50'}`}>
        <span className="block mb-4 text-center text-2xl">{question}</span>
        <div className="flex justify-between items-center">
          <span className="text-xl text-green-500">Agree</span>
          <div className={`flex flex-col items-center ${selectedOption === 1 ? 'opacity-100' : 'opacity-80'} cursor-pointer`} onClick={() => handleOptionClick(1)}>
            <div className={`w-14 h-14  rounded-full hover:bg-green-400 border-[3px] ${selectedOption === 1 ? 'border-green-500' : ''} ${selectedOption === 1 ? 'bg-green-400' : ''}`}></div>
          </div>
          <div className={`flex flex-col items-center ${selectedOption === 2 ? 'opacity-100' : 'opacity-80'} cursor-pointer`} onClick={() => handleOptionClick(2)}>
            <div className={`w-11 h-11  rounded-full hover:bg-green-400 border-[3px] ${selectedOption === 2 ? 'border-green-500' : ''} ${selectedOption === 2 ? 'bg-green-400' : ''}`}></div>
          </div>
          <div className={`flex flex-col items-center ${selectedOption === 3 ? 'opacity-100' : 'opacity-80'} cursor-pointer`} onClick={() => handleOptionClick(3)}>
            <div className={`w-10 h-10  rounded-full hover:bg-green-400 border-[3px] ${selectedOption === 3 ? 'border-green-500' : ''} ${selectedOption === 3 ? 'bg-green-400' : ''}`}></div>
          </div>
          <div className={`flex flex-col items-center ${selectedOption === 4 ? 'opacity-100' : 'opacity-80'} cursor-pointer`} onClick={() => handleOptionClick(4)}>
            <div className={`w-9 h-9  rounded-full hover:bg-green-400 border-[3px] ${selectedOption === 4 ? 'border-gray-500' : ''} ${selectedOption === 4 ? 'bg-green-400' : ''}`}></div>
          </div>
          <div className={`flex flex-col items-center ${selectedOption === 5 ? 'opacity-100' : 'opacity-80'} cursor-pointer`} onClick={() => handleOptionClick(5)}>
            <div className={`w-10 h-10  rounded-full hover:bg-green-400 border-[3px] ${selectedOption === 5 ? 'border-purple-700' : ''} ${selectedOption === 5 ? 'bg-green-400' : ''}`}></div>
          </div>
          <div className={`flex flex-col items-center ${selectedOption === 6 ? 'opacity-100' : 'opacity-80'} cursor-pointer`} onClick={() => handleOptionClick(6)}>
            <div className={`w-11 h-11  rounded-full hover:bg-green-400 border-[3px] ${selectedOption === 6 ? 'border-purple-700' : ''} ${selectedOption === 6 ? 'bg-green-400' : ''}`}></div>
          </div>
          <div className={`flex flex-col items-center ${selectedOption === 7 ? 'opacity-100' : 'opacity-80'} cursor-pointer`} onClick={() => handleOptionClick(7)}>
            <div className={`w-14 h-14  rounded-full hover:bg-green-400 border-[3px] ${selectedOption === 7 ? 'border-purple-700' : ''} ${selectedOption === 7 ? 'bg-green-400' : ''}`}></div>
          </div>
          <span className="text-xl text-purple-700">Disagree</span>
        </div>
      </div>
    </div>
  );
};

export default LikertScale;
