import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import propertyReducer from './reducers/propertyReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    property: propertyReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export default store;
