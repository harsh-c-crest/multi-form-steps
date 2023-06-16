import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducer';
import MultiForm from './components/MultiForm';

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <MultiForm />
    </Provider>
  );
};

export default App;
