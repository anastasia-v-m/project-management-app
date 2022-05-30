import React from 'react';
import RSSchoolLogoSVG from '../../assets/RSSchoolLogoSVG';
import { AppContext } from '../../components/AppContext';
import siteContent from '../../containers/content';
import './footer.scss';

export default function Footer(): JSX.Element {
  return (
    <AppContext.Consumer>
      {(context): JSX.Element => (
        <footer className="footer">
          <div className="developers-links_course">
            <a
              className="footer__dev-link"
              href="https://rs.school/react/"
              target="_blank"
              rel="noreferrer"
            >
              <RSSchoolLogoSVG />
            </a>
          </div>
          <span className="footer__year">2022</span>
          <ul className="footer__members">
            {siteContent[context.locale].developers.map(
              (item: { role: string; gitname: string }, index: number): JSX.Element => (
                <li key={index}>
                  <a
                    className="footer__dev-link"
                    href={`https://github.com/${item.gitname}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="footer__dev-role">{`${item.role}: `}</span>
                    <span>{item.gitname}</span>
                  </a>
                </li>
              )
            )}
          </ul>
        </footer>
      )}
    </AppContext.Consumer>
  );
}
