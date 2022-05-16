import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { STUB_URL, WELCOM_PAGE_URL, LOGIN_URL } from './containers/utlsList';
import WelcomePage from './containers/WelcomePage';
import { Provider } from 'react-redux';
import store from './store/store';
import Stub from './containers/Stub';
import LogInPage from './containers/LogInPage';
import AppProvider from './components/AppProvider';
import './App.scss';
import './reset.scss';

function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <React.StrictMode>
          <BrowserRouter>
            <Routes>
              <Route path={WELCOM_PAGE_URL} element={<WelcomePage />} />
              <Route path={STUB_URL} element={<Stub />} />
              <Route path={LOGIN_URL} element={<LogInPage />} />
            </Routes>
          </BrowserRouter>
        </React.StrictMode>
      </AppProvider>
    </Provider>
  );
}

export default App;
