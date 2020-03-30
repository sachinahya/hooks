import { BasicAction, UndoRedoActions, UndoRedoState } from './types';

export const initState = <S>(initialState: S): UndoRedoState<S> => ({
  past: [],
  present: initialState,
  future: [],
});

export const makeUndoable = <S, A extends BasicAction>(
  reducer: React.Reducer<S, A>
): React.Reducer<UndoRedoState<S>, UndoRedoActions<A>> => {
  return (state, action) => {
    const { past, present, future } = state;

    switch (action.type) {
      case 'UNDO': {
        const previous = past[past.length - 1];
        if (!previous) return state;
        const newPast = past.slice(0, past.length - 1);

        return {
          past: newPast,
          present: previous,
          future: [present, ...future],
        };
      }

      case 'REDO': {
        const next = future[0];
        if (!next) return state;
        const newFuture = future.slice(1);

        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        };
      }

      case 'CLEAR': {
        return initState(state.present);
      }

      default: {
        const newPresent = reducer(present, action as A);

        if (present === newPresent) return state;
        return {
          past: [...past, present],
          present: newPresent,
          future: [],
        };
      }
    }
  };
};
