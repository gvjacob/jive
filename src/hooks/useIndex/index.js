import React, { useState, useEffect } from 'react';

const useIndex = (list) => {
  const [index, setIndex] = useState(0);
  const length = list.length;

  useEffect(() => {
    if (index >= length) {
      setIndex(Math.max(length - 1, 0));
    }
  }, [list]);

  const next = () => {
    setIndex(index >= length - 1 ? 0 : index + 1);
  };

  const previous = () => {
    setIndex(index <= 0 ? length - 1 : index - 1);
  };

  return [previous, next, index];
};

export default useIndex;
