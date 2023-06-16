import React from 'react';
import { Provider } from 'react-redux';
import UserForm from './components/UserForm';
import store from './redux/store';

// Declare the App component
// App includes the client-side router, which looks as the user's URL/path, and renders the corresponding React page
const App = () => {
  return (
    <Provider store={store}>
      <UserForm />
    </Provider>
  );
};

export default App;
