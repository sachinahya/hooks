import React, { useReducer } from 'react';
import { initState, makeUndoable } from './enhancer';
import { BasicAction } from './types';

export interface UndoableReducer<S, A> {
  /**
   * Current state.
   */
  state: S;

  /**
   * Indicates if it is currently possible to undo.
   */
  canUndo: boolean;

  /**
   * Indicates if it is currently possible to redo.
   */
  canRedo: boolean;

  /**
   * Dispatch actions to the reducer.
   */
  dispatch(action: A): void;

  /**
   * Undo the current state.
   */
  undo(): void;

  /**
   * Redo the state.
   */
  redo(): void;

  /**
   * Clear undo and redo history. Useful after making API calls.
   */
  clearHistory(): void;
}

/**
 * Extends a React reducer to provide undo/redo capabilities.
 *
 * @template S State type.
 * @template A Action type.
 * @param reducer A React reducer to enhance.
 * @param initialState Initial 'present' state for the reducer.
 * @returns An undoable reducer.
 */
export const useUndoableReducer = <S, A extends BasicAction>(
  reducer: React.Reducer<S, A>,
  initialState: S
): UndoableReducer<S, A> => {
  // ? Does this need to be memoized? Answer: probably not
  const undoableReducer = makeUndoable(reducer);

  const [state, dispatch] = useReducer(undoableReducer, initialState, initState);

  return {
    state: state.present,
    // Removes undo/redo/clear actions from typings
    dispatch,
    undo: () => dispatch({ type: 'UNDO' }),
    redo: () => dispatch({ type: 'REDO' }),
    clearHistory: () => dispatch({ type: 'CLEAR' }),
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  };
};
