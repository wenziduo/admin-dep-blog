const initialState = {
  userInfo: {}
}
export function globalReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "appendUserInfo":
      return {
        ...state,
        userInfo: payload.userInfo
      };
    default: return initialState;
  }
}
