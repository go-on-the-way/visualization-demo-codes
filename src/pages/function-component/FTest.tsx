import { useState } from 'react';

const FTest = () => {
  const [data, setData] = useState({ a: 1, b: 2 });
  const updateState = (cur) => {
    setData((prevState) => {
      return {
        ...prevState,
        ...cur,
      };
    });
  };
  return (
    <>
      <button
        onClick={() => {
          updateState({ b: ++data.b });
        }}
      >
        {data.a}addB
      </button>
      <div>{data.b}</div>
    </>
  );
};

export default FTest;
