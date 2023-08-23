import React, { createContext, useContext, useState } from 'react';

const MoveContext = createContext();

export function MoveProvider({ children }) {
  const [move, setMove] = useState("");

  return (
    <MoveContext.Provider value={{ move, setMove }}>
      {children}
    </MoveContext.Provider>
  );
}

export function useMove() {
  return useContext(MoveContext);
}
