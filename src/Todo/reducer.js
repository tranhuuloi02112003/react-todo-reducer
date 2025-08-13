import { ADD_JOB, DELETE_JOB, SET_JOB } from "./actions";
// 1. Init state
export const initState = { job: "", jobs: [] };

// 3. Reducer
const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case SET_JOB:
      newState = {
        ...state,
        job: action.payload,
      };
      break;
    case ADD_JOB:
      newState = {
        ...state,
        jobs: [...state.jobs, action.payload],
      };
      break;
    case DELETE_JOB:
      newState = {
        ...state,
        jobs: state.jobs.filter((_, index) => index !== action.payload),
      };
      break;

    default:
      throw new Error("Invalid action type");
  }
  return newState;
};

export default reducer;
