import useIndex from '.';
import { renderHook, act } from '@testing-library/react-hooks';

describe('useIndex', () => {
  const getUseIndex = (list) => {
    const { result, rerender } = renderHook(({ list }) => useIndex(list), {
      initialProps: { list },
    });
    return { result, rerender };
  };

  const expectOnIndexAfterNext = (result, expectedIndex) => {
    act(result.current.next);
    expect(result.current.index).toEqual(expectedIndex);
  };

  const expectOnIndexAfterPrevious = (result, expectedIndex) => {
    act(result.current.previous);
    expect(result.current.index).toEqual(expectedIndex);
  };

  it('initializes index to 0', () => {
    const { result } = getUseIndex([1, 2, 3]);
    expect(result.current.index).toEqual(0);
  });

  it('initializes index to 0 when empty list', () => {
    const { result } = getUseIndex([]);
    expect(result.current.index).toEqual(0);
  });

  describe('next', () => {
    it('increments index', () => {
      const { result } = getUseIndex([1, 2, 3]);
      expect(result.current.index).toEqual(0);

      expectOnIndexAfterNext(result, 1);
    });

    it('resets index to 0 when at end of list', () => {
      const { result } = getUseIndex([1, 2]);
      expect(result.current.index).toEqual(0);

      expectOnIndexAfterNext(result, 1);
      expectOnIndexAfterNext(result, 0);
    });

    it('index stays at 0 when empty', () => {
      const { result } = getUseIndex([]);
      expect(result.current.index).toEqual(0);

      expectOnIndexAfterNext(result, 0);
    });
  });

  describe('previous', () => {
    it('decrements index', () => {
      const { result } = getUseIndex([1, 2, 3]);
      expect(result.current.index).toEqual(0);

      expectOnIndexAfterNext(result, 1);
      expectOnIndexAfterPrevious(result, 0);
    });

    it('resets index to end of list when at start', () => {
      const { result } = getUseIndex([1, 2, 3]);
      expect(result.current.index).toEqual(0);

      expectOnIndexAfterPrevious(result, 2);
    });

    it('index stays at 0 when empty', () => {
      const { result } = getUseIndex([]);
      expect(result.current.index).toEqual(0);

      expectOnIndexAfterPrevious(result, 0);
    });
  });

  describe('rerender', () => {
    it('index stays if still within list length', () => {
      const list = [1, 2, 3];
      const { result, rerender } = getUseIndex(list);

      act(result.current.next);
      expect(result.current.index).toEqual(1);

      rerender({ list: [1, 2] });
      expect(result.current.index).toEqual(1);
    });

    it('resets index to new length of list', () => {
      const list = [1, 2, 3];
      const { result, rerender } = getUseIndex(list);

      act(result.current.next);
      expect(result.current.index).toEqual(1);

      rerender({ list: [1] });
      expect(result.current.index).toEqual(0);
    });

    it('resets index to 0 when changed to empty list', () => {
      const list = [1, 2, 3];
      const { result, rerender } = getUseIndex(list);

      act(result.current.next);
      expect(result.current.index).toEqual(1);

      rerender({ list: [] });
      expect(result.current.index).toEqual(0);
    });
  });
});
