import React from 'react';
import LogInSection from '../../modules/LogInSection';
import Header from '../../modules/Header/Header';
import Footer from '../../modules/Footer/Footer';
import './page404.scss';
import { AppContext } from '../../components/AppContext';
import siteContent from '../content';

export default function ProjectPage(): JSX.Element {
  return (
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <>
          <LogInSection />
          <Header />
          <main>
            <div className="msg-404">{siteContent[context.locale].pageNotFound}</div>
          </main>
          <Footer />
        </>
      )}
    </AppContext.Consumer>
  );
}
