//reducer.js
const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return initialState
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
  }
}

export default function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(
    //  const [state, dispatch] = useReducer(reducer, initialState);
    reducer,
    initialState,
    { type: 'reset', payload: initialCount } //，则在初始渲染期间应用初始操作
  )
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  )
}
