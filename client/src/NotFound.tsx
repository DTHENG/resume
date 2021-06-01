import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Link, ResumeTitle } from './layout';
import ReactGA from 'react-ga';

const NotFoundContainer = styled(Container)`
  max-width: 240px;
  display: flex;
  height: 60vh;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const Title = styled(ResumeTitle)`
  text-align: center;
  margin-bottom: 50px;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

function NotFound() {
  const [loaded, setLoaded] = useState(false);

  window.addEventListener('load', () => setLoaded(true), false);

  return (
    <NotFoundContainer
      className="container"
      style={{ opacity: loaded ? 1 : 0 }}
    >
      <Wrapper>
        <Title>Page Not Found</Title>
        <Links>
          <Link
            href="/"
            onClick={() => {
              ReactGA.event({
                category: 'Links',
                action: 'PageNotFound',
                label: 'Home',
              });
            }}
            data-testid="homeLinkTestId"
          >
            Home
          </Link>
          <Link
            href="/resume"
            onClick={() => {
              ReactGA.event({
                category: 'Links',
                action: 'PageNotFound',
                label: 'Resume',
              });
            }}
            data-testid="resumeLinkTestId"
          >
            Resume
          </Link>
        </Links>
      </Wrapper>
    </NotFoundContainer>
  );
}

export default NotFound;
