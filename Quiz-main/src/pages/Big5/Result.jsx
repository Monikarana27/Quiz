import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Progress } from 'antd';
import a from '../../assets/big5/a.png';
import e from '../../assets/big5/e.png';
import o from '../../assets/big5/o.png';
import c from '../../assets/big5/c.png';
import n from '../../assets/big5/n.png';


const Result = ({ results, finalScore }) => {
  const user = {
    O: finalScore.O,
    C: finalScore.C,
    E: finalScore.E,
    A: finalScore.A,
    N: finalScore.N
  };
  const globaluser = {
    O: 34,
    C: 37,
    E: 22,
    A: 21,
    N: 30
  };
  const [showGlobal, setShowGlobal] = useState(false);

  console.log("finalScore", finalScore);
  console.log("result", results);

  return (
    <div className='mx-4 my-4'>
      <Link to="/" className='bg-blue-500 text-white px-2 rounded-md ml-2 py-1'>Home</Link>
      <div className='flex justify-center'>
        <div className='w-60 py-12'>
          <div className='text-center w-full'>Thank you for taking the test</div>
          <Progress percent={100} strokeColor={'#22C55E'} />
        </div>
      </div>
      <h1 className='text-center text-3xl text-semibold'>Quiz Results</h1>
      <div className='flex justify-evenly my-4'>
        <p className='text-xl text-semibold '>The Big Five Traits are: </p>
        <button className="bg-red-500 text-white py-1 px-2 rounded-md " onClick={() => setShowGlobal(!showGlobal)}>
          {showGlobal ?
            'Hide Global Result' : 'Show Global Result'}
        </button>
      </div>

      {showGlobal ? (
        <div className='flex justify-center'>
          <table className='w-60'>
            <tr>
              <td className='p-8'>
                <div className='flex flex-col items-center'>
                  <img src={o} alt="img" />
                  <strong>
                    Openness
                  </strong>
                </div>
              </td>
              <td>
                <Progress percent={user.O} steps={8}  size={[50, 20]} />
                <Progress percent={globaluser.O} steps={8} strokeColor="red" size={[50, 20]} />
              </td>
              
            </tr>
            <tr>
              <td className='p-8'>
                <div className='flex flex-col items-center'>
                  <img src={e} alt="img" />
                  <strong>
                    Extraversion
                  </strong>
                </div>
              </td>
              <td>
                <Progress percent={user.E} steps={8} size={[50, 20]} />
                <Progress percent={globaluser.E} steps={8} strokeColor="red" size={[50, 20]} />
              </td>
              
            </tr>
            <tr>
              <td className='p-8'>
                <div className='flex flex-col items-center'>
                  <img src={c} alt="img" />
                  <strong>
                    Conscientiousness
                  </strong>
                </div>
              </td>
              <td>
                <Progress percent={user.C} steps={8} size={[50, 20]} />
                <Progress percent={globaluser.C} steps={8} strokeColor="red" size={[50, 20]} />
              </td>
            </tr>
            <tr>
              <td className='p-8'>
                <div className='flex flex-col items-center'>
                  <img src={a} alt="img" />
                  <strong>
                    Agreeableness
                  </strong>
                </div>
              </td>
              <td>
                <Progress percent={user.A} steps={8} size={[50, 20]} />
                <Progress percent={globaluser.A} steps={8} strokeColor="red" size={[50, 20]} />
              </td>
              
            </tr>
            <tr>
              <td className='p-8'>
                <div className='flex flex-col items-center'>
                  <img src={n} alt="img" />
                  <strong>
                    Neuroticism
                  </strong>
                </div>
              </td>
              <td>
                <Progress percent={user.N} steps={8} size={[50, 20]} />
                <Progress percent={globaluser.N} steps={8} strokeColor="red" size={[50, 20]} />
              </td>
              
            </tr>
          </table>
        </div>
      ) : (
        <div className='flex justify-center'>
          <table className='w-60'>
            <tr>
              <td className='p-8'>
                <div className='flex flex-col items-center'>
                  <img src={o} alt="img"  />
                  <strong>
                    Openness
                  </strong>
                </div>
              </td>
              <td>
                <Progress percent={user.O} steps={8} size={[50, 20]}  />
              </td>
            </tr>
            <tr>
              <td className='p-8'>
                <div className='flex flex-col items-center'>
                  <img src={e} alt="img"  />
                  <strong>
                    Extraversion
                  </strong>
                </div>
              </td>
              <td>
                <Progress percent={user.E} steps={8} size={[50, 20]} />
              </td>
            </tr>
            <tr>
              <td className='p-8'>
                <div className='flex flex-col items-center'>
                  <img src={c} alt="img"  />
                  <strong>
                    Conscientiousness
                  </strong>
                </div>
              </td>
              <td>
                <Progress percent={user.C} steps={8} size={[50, 20]} />
              </td>
            </tr>
            <tr>
              <td className='p-8'>
                <div className='flex flex-col items-center'>
                  <img src={a} alt="img"  />
                  <strong>
                    Agreeableness
                  </strong>
                </div>
              </td>
              <td>
                <Progress percent={user.A} steps={8} size={[50, 20]} />
              </td>
            </tr>
            <tr>
              <td className='p-8'>
                <div className='flex flex-col items-center'>
                  <img src={n} alt="img"  />
                  <strong>
                    Neuroticism
                  </strong>
                </div>
              </td>
              <td>
                <Progress percent={user.N} steps={8} size={[50, 20]} />
              </td>
            </tr>
          </table>
        </div>
      )}
    </div>
  );
};

export default Result;
