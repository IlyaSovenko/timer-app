import { ADD_TIMER, REMOVE_TIMER, START_NEW_TIMER, END_NEW_TIMER } from '../constants/actions';

export const addTimer = (payload) => dispatch => {
  dispatch({type: ADD_TIMER, payload});
};

export const removeTimer = (id) => dispatch => {
  dispatch({type: REMOVE_TIMER, id});
};

export const startNewTimer = (time) => dispatch => {
  dispatch({type:START_NEW_TIMER, time});
};
export const endNewTimer = () => dispatch => {
  dispatch({type:END_NEW_TIMER});
};

