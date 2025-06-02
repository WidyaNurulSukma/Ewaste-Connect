import { configureStore } from '@reduxjs/toolkit';
import contributionReducer from './reducers/contribution.reducer';
import orderReducer from './reducers/order.reducer';

const store = configureStore({
  reducer: {
    order: orderReducer,
    contribution: contributionReducer
  }
});

export default store;
