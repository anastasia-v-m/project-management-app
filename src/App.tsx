import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  STUB_URL,
  WELCOM_PAGE_URL,
  LOGIN_URL,
  PROJECTS_URL,
  COLUMNS_URL,
} from './containers/utlsList';
import WelcomePage from './containers/WelcomePage';
import { Provider } from 'react-redux';
import store from './store/store';
import Stub from './containers/Stub';
import LogInPage from './containers/LogInPage';
import AppProvider from './components/AppProvider';
import PrivateRoute from './components/PrivateRoute';
import ProjectsPage from './containers/ProjectsPage';
import './App.scss';
import './reset.scss';
import ColumnsPage from './containers/ColumnsPage';

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
              <Route
                path={PROJECTS_URL}
                element={
                  <PrivateRoute>
                    <ProjectsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={COLUMNS_URL}
                element={
                  <PrivateRoute>
                    <ColumnsPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </React.StrictMode>
      </AppProvider>
    </Provider>
  );
}

export default App;
