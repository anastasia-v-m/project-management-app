import React from 'react';
import { AppContext } from '../../components/AppContext';
import Footer from '../../modules/Footer/Footer';
import Header from '../../modules/Header/Header';
import LogInSection from '../../modules/LogInSection';
import WelcomePageEn from './components/WelcomePageEn';
import WelcomePageRu from './components/WelcomePageRu';
import './welcomePage.scss';

export default function WelcomePage(): JSX.Element {
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
