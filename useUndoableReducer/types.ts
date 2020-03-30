export interface BasicAction<T extends string = string> {
  type: T;
}

export interface UndoRedoState<T> {
  past: T[];
  present: T;
  future: T[];
}

export type UndoRedoActions<T> =
  | T
  | BasicAction<'UNDO'>
  | BasicAction<'REDO'>
  | BasicAction<'CLEAR'>;
