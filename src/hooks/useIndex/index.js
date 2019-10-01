import React, { useState, useEffect } from 'react';

const useIndex = (list) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= list.length) {
      setIndex(Math.max(list.length - 1, 0));
    }
  }, [list]);

  const next = () => {
    setIndex(index >= list.length - 1 ? 0 : index + 1);
  };

  const previous = () => {
    setIndex(index <= 0 ? list.length - 1 : index - 1);
  };

  return [previous, next, index];
};

export default useIndex;
