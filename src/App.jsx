import React from 'react';
import { Provider } from 'react-redux';
import MultiForm from './components/MultiForm';
import store from './redux/store';



const App = () => {
  return (
    <Provider store={store}>
      <MultiForm />
    </Provider>
  );
};

export default App;
