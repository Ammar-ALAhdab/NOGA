import { useReducer } from "react";

const useObjectReducer = (initialState, attributeHandlers) => {
  const [state, dispatch] = useReducer((currentState, action) => {
    const updatedAttribute = action.payload;
    return { ...currentState, [action.type]: updatedAttribute };
  }, initialState);

  const attributeDispatchers = Object.entries(attributeHandlers).reduce(
    (dispatchers, [attribute, handler]) => {
      dispatchers[attribute] = (value) =>
        dispatch({ type: attribute, payload: value });
      return dispatchers;
    },
    {}
  );

  return { state, ...attributeDispatchers };
};

export default useObjectReducer;
