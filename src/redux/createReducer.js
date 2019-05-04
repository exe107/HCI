export const reducerWithActionMappings = (mappings, initialState) => (
  state = initialState,
  action
) => {
  const reducer = mappings[action.type];

  return reducer ? reducer(state, action) : state;
};
