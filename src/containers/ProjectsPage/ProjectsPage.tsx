import React, { useEffect } from 'react';
import { AppContext } from '../../components/AppContext';
import { useAppDispatch } from '../../store/store';
import LogInSection from '../../modules/LogInSection';
import Header from '../../modules/Header/Header';
import Footer from '../../modules/Footer/Footer';
import ProjectsList from '../../modules/ProjectsList';
import './projectsPage.scss';
import { GlobalAction } from '../../store/reducers';

const HEADER_BOTTOM = 156;

export default function ProjectPage(): JSX.Element {
  // const dispatch = useAppDispatch();
  // const fixYPosition = () => {
  //   dispatch({ type: GlobalAction.setHeaderBottom, payload: window.scrollY });
  // };
  // useEffect(() => {
  //   window.addEventListener('scroll', fixYPosition);
  //   console.log(7);
  // });

  return (
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <>
          <LogInSection />
          <Header />
          <main>
            <ProjectsList />
          </main>
          <Footer />
        </>
      )}
    </AppContext.Consumer>
  );
}
