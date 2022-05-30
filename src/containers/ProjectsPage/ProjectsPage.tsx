import React from 'react';
import LogInSection from '../../modules/LogInSection';
import Header from '../../modules/Header/Header';
import Footer from '../../modules/Footer/Footer';
import ProjectsList from '../../modules/ProjectsList';
import './projectsPage.scss';

export default function ProjectPage(): JSX.Element {
  return (
    <>
      <LogInSection />
      <Header />
      <main>
        <ProjectsList />
      </main>
      <Footer />
    </>
  );
}
