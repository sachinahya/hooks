import React, { useEffect, useState } from 'react';

type JSONPrimitive = string | number | boolean | null;
type JSONValue = JSONPrimitive | JSONObject | JSONArray;
type JSONArray = JSONValue[];
type JSONObject = { [member: string]: JSONValue };

export interface UseStorageOptions {
  session?: boolean;
}

export const useStorage = <T extends JSONObject = JSONObject>(
  key: string,
  { session }: UseStorageOptions = {}
): [T | null, React.Dispatch<React.SetStateAction<T | null>>] => {
  const storage = session ? window.sessionStorage : window.localStorage;
  const initialState = storage.getItem(key);
  const [state, setState] = useState<T | null>(initialState ? JSON.parse(initialState) : null);

  useEffect(() => {
    storage.setItem(key, typeof state == 'string' ? state : JSON.stringify(state));
  }, [key, state, storage]);

  return [state, setState];
};

export default useStorage;
