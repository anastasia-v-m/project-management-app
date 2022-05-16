import React, { useEffect } from 'react';

export default function WelcomePageEn(): JSX.Element {
  return (
    <>
      <section className="welcome__team">
        <h3>A little about us</h3>
        <p>Hi!</p>
        <ul>
          We are members of Team 62.
          <li>Nikita</li>
          <li>Yuriy</li>
          <li>Anastasia</li>
          <li>Konstantin (out mentor)</li>
        </ul>
      </section>
      <section className="welcome__project">
        <h3>A little about our project</h3>
        <p>We have developed a project management app.</p>
        <p>Before you get started, you must register and log in.</p>
        <p>Next, you will see your workspace - a page with all your boards.</p>
        <ul>
          You can manage your boards:
          <li>Create new ones</li>
          <li>Edit existing ones</li>
          <li>Delete unnecessary ones</li>
          <li>Move them</li>
        </ul>
        <p>
          When you log in with your account, you receive a token. The token allows you to work in
          the system for a limited amount of time. When it expires, you will be redirected to this
          page.
        </p>
        <p>Happy using!</p>
      </section>
      <section className="welcome__course">
        <h3>Our course.</h3>
        <p>We are students of the online course «Development with React».</p>
        <p>
          During the course, we got acquainted with the React framework. Learned to use class and
          function components. We got acquainted with hooks - useState, useEffect, useRef and
          others. Understand when to use context and redux.
        </p>
        <p>
          As a final task, accumulating the acquired knowledge and skills, giving the opportunity to
          realize their own ideas within the framework of a given topic, this project.
        </p>
        <p>
          The course is free and open to everyone. Students are required to have basic knowledge
          JavaScript, TypeScript, GitHub, NPM, Webpack, CSS3 / HTML5, Chrome DevTools, Figma, REST
          API, as well as the desire to learn a profession, learn, consolidate knowledge in
          practice.
        </p>
      </section>
    </>
  );
}
