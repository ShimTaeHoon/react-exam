import React from 'react';
import { Example } from './component/example';
import { Provider } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

export const exampleSlice = createSlice({
  name: 'exampleSlice',
  initialState: { examplelist: [] },
  reducers: {
    ADD: (state, action) => {
      console.log(action); 
      let id = state.examplelist.length;
      let example = { id: id, ...action.payload }; 
      state.examplelist.push(example); 
    },
    DELETE: (state, action) => {
      state.examplelist = state.examplelist.filter(item => item.id !== action.payload);
    }
  },
});

const store = configureStore({
  reducer: {
    example: exampleSlice.reducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <div>
        <Example></Example>
      </div>
    </Provider>
  );
}

export default App;