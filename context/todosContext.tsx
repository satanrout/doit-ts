import React, { useState, createContext } from "react";

export const TodosContext = createContext();

export const TodoProvider = ({ children }) => {
  const [changed, setChanged] = useState(false);
  return (
    <TodosContext.Provider value={{ changed, setChanged }}>
      {children}
    </TodosContext.Provider>
  );
};
