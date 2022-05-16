import React, { useEffect } from 'react';
import { AppContext } from '../../components/AppContext';
import Footer from '../../modules/Footer/Footer';
import Header from '../../modules/Header/Header';
import LogInSection from '../../modules/LogInSection';
import { GlobalAction } from '../../store/reducers';
import { useAppDispatch } from '../../store/store';
import WelcomePageEn from './components/WelcomePageEn';
import WelcomePageRu from './components/WelcomePageRu';
import './welcomePage.scss';

export default function WelcomePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const fixYPosition = () => {
    dispatch({ type: GlobalAction.setHeaderBottom, payload: window.scrollY });
  };
  useEffect(() => {
    window.addEventListener('scroll', fixYPosition);
  });
  return (
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <>
          <LogInSection />
          <Header />
          <main className="welcome">
            {context.locale === 0 ? <WelcomePageEn /> : <WelcomePageRu />}
          </main>
          <Footer />
        </>
      )}
    </AppContext.Consumer>
  );
}
