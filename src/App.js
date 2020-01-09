import React from 'react';
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import Header from './components/Header/index'
import GlobalStyle from './styles/global'
import history from './services/history'
import Routes from './routes'


import store from './store/index'

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header></Header>
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;
