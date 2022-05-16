import React, { useEffect } from 'react';
import Header from '../../modules/Header/Header';
import LogInSection from '../../modules/LogInSection';
import { GlobalAction } from '../../store/reducers';
import { useAppDispatch } from '../../store/store';
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
    <>
      <LogInSection />
      <Header />
      <main className="welcome">
        <section className="welcome__team">
          <h3>Немного о нас</h3>
          <p>Привет!</p>
          <ul>
            Мы участники команды 62.
            <li>Никита</li>
            <li>Юрий</li>
            <li>Анастасия</li>
            <li>Наш ментор - Константин</li>
          </ul>
        </section>
        <section className="welcome__project">
          <h3>Немного о нашем проекте</h3>
          <p>Мы разработали систему управления проектами. </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et ipsa inventore nostrum
            magnam quas! Obcaecati nulla repudiandae unde dolor voluptatibus architecto omnis quae
            expedita dolorem! Labore asperiores odit iste cum?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et ipsa inventore nostrum
            magnam quas! Obcaecati nulla repudiandae unde dolor voluptatibus architecto omnis quae
            expedita dolorem! Labore asperiores odit iste cum?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et ipsa inventore nostrum
            magnam quas! Obcaecati nulla repudiandae unde dolor voluptatibus architecto omnis quae
            expedita dolorem! Labore asperiores odit iste cum?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et ipsa inventore nostrum
            magnam quas! Obcaecati nulla repudiandae unde dolor voluptatibus architecto omnis quae
            expedita dolorem! Labore asperiores odit iste cum?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et ipsa inventore nostrum
            magnam quas! Obcaecati nulla repudiandae unde dolor voluptatibus architecto omnis quae
            expedita dolorem! Labore asperiores odit iste cum?
          </p>
        </section>
        <section className="welcome__course">
          <h3>Наш курс.</h3>
          <p>Мы студенты онлайн курс «Разработка на React».</p>
          <p>
            За время прохождения курса мы познакомились с фреймворком React. Научились использовать
            классовые и функуциональные компоненты. Познакомились с хуками - useState, useEffect,
            useRef и другими. Поняли когда использовать контекст и redux.
          </p>
          <p>
            В качестве финального задания, аккумулирующего полученные знания и навыки, дающего
            возможность реализовать собственные идею в рамках заданной темы, выступает данный
            проект.
          </p>
          <p>
            Курс бесплатный и расчитан на всех желающих. От студентов требуются базовые знания
            JavaScriptб TypeScript, GitHub, NPM, Webpack, CSS3 / HTML5, Chrome DevTools, Figma, REST
            API, а также желание узнавать профессию, учиться, закреплять на практике знания.
          </p>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
}
