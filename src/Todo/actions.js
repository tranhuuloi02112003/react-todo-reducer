// 2. Action
export const SET_JOB = "set_job";
export const ADD_JOB = "add_job";
export const DELETE_JOB = "delete_job";

export const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload,
  };
};

export const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload,
  };
};

export const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload,
  };
};