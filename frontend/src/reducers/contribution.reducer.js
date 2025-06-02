import { createSlice } from '@reduxjs/toolkit';

const contributionSlice = createSlice({
  name: 'contribuition',
  initialState: [],
  reducers: {
    setContribution (state, action) {
      return action.payload;
    },
    addContribution (state, action) {
      return state.concat(action.payload);
    },
    removeContributions () {
      return [];
    }
  }
});

export const initializeContribution = (contributions) => {
  return (dispatch, getState) => {
    return dispatch(setContribution(contributions));
  };
};

export const newContribution = (contribution) => {
  return (dispatch, getState) => {
    return dispatch(addContribution(contribution));
  };
};

export const clearContribution = () => {
  return (dispatch, getState) => {
    return dispatch(removeContributions());
  };
};

export const { setContribution, addContribution, removeContributions } =
  contributionSlice.actions;
export default contributionSlice.reducer;
