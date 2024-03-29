import React, { useState } from 'react';
import { Container, Link } from './layout';
import {
  formatBlurb,
  getBlurb,
  SocialLink,
  socialLinks,
  SocialLinkColorScheme,
} from './utils';
import styled from 'styled-components';
import ReactGA from 'react-ga';

const OuterWrapper = styled.div`
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 0.95rem;
  line-height: 1.6rem;
`;

const BlurbWrapper = styled(Text)`
  max-width: 510px;
  padding: 0 30px;
`;

const PortraitWrapper = styled.div`
  width: 150px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Portrait = styled.img`
  border-radius: 100%;
  width: 110px;
  height: 110px;
`;

const Name = styled.h1`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.02rem;
  margin-bottom: 30px;
`;

const ResumeLinks = styled(Text)`
  margin-top: 15px;
  width: 100%;
  padding: 0 30px;
`;

const SocialLinksWrapper = styled.div`
  display: flex;
  width: 75%;
  height: 230px;
  justify-content: space-between;
  align-items: center;
`;

const SocialLinkItem = styled.a<{ colorScheme: SocialLinkColorScheme }>`
  width: 55px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
  color: ${(props) => props.colorScheme.default};
  .foreground {
    fill: ${(props) => props.colorScheme.default};
  }
  &:hover,
  &:focus,
  &:visited {
    color: ${(props) => props.colorScheme.hover};
    .foreground {
      fill: ${(props) => props.colorScheme.hover};
    }
    span {
      opacity: 1;
    }
  }
`;

const SocialLinkIcon = styled.div``;

const SocialLinkTitle = styled.span`
  opacity: 0;
  transition: opacity 200ms;
  font-size: 0.8rem;
  letter-spacing: 0.02rem;
  font-weight: 600;
`;

function Home() {
  const blurb = formatBlurb(getBlurb());
  const [loaded, setLoaded] = useState(false);

  window.addEventListener('load', () => setLoaded(true), false);

  return (
    <Container className="container" style={{ opacity: loaded ? 1 : 0 }}>
      <OuterWrapper>
        <InnerWrapper>
          <PortraitWrapper>
            <Portrait
              data-testid="profileImage"
              src={
                process.env.REACT_APP_LOCAL_PROFILE_IMAGE &&
                process.env.REACT_APP_LOCAL_PROFILE_IMAGE === 'true'
                  ? '/profile.jpg'
                  : 'https://storage.googleapis.com/com-dtheng/profile.jpg'
              }
            />
          </PortraitWrapper>
          <Name>Daniel Thengvall</Name>
          <BlurbWrapper data-testid="blurb">{blurb}</BlurbWrapper>
          <ResumeLinks>
            <Link
              href="/resume"
              title="Daniel Thengvall's Resume"
              onClick={() => {
                ReactGA.event({
                  category: 'Links',
                  action: 'Blurb',
                  label: 'Resume HTML',
                });
              }}
              data-testid="htmlResumeLink"
            >
              Web
            </Link>{' '}
            or{' '}
            <Link
              href="https://storage.googleapis.com/com-dtheng/DanielThengvallResume.pdf"
              title="PDF of Daniel Thengvall's Resume"
              target="_blank"
              onClick={() => {
                ReactGA.event({
                  category: 'Links',
                  action: 'Blurb',
                  label: 'Resume PDF',
                });
              }}
              data-testid="pdfResumeLink"
            >
              PDF
            </Link>{' '}
            Resume
          </ResumeLinks>
          <SocialLinksWrapper>
            {socialLinks.map((link: SocialLink, index) => {
              const {
                icon,
                href,
                title,
                category,
                action,
                label,
                color,
                testId,
              } = link;
              return (
                <SocialLinkItem
                  key={index}
                  href={href}
                  target="_blank"
                  title={title}
                  onClick={() => {
                    ReactGA.event({
                      category,
                      action,
                      label,
                    });
                  }}
                  colorScheme={color}
                  data-testid={testId}
                >
                  <SocialLinkIcon>{icon}</SocialLinkIcon>
                  <SocialLinkTitle>{title}</SocialLinkTitle>
                </SocialLinkItem>
              );
            })}
          </SocialLinksWrapper>
        </InnerWrapper>
      </OuterWrapper>
    </Container>
  );
}

export default Home;
