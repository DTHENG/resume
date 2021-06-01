import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from './layout';
import { formatResume, getResume } from './utils';

const ResumeContainer = styled(Container)`
  padding-top: 80px;
  padding-bottom: 80px;
  max-width: 530px;
`;

function Resume() {
  const [loaded, setLoaded] = useState(false);

  window.addEventListener('load', () => setLoaded(true), false);

  const resume = formatResume(getResume());

  return (
    <ResumeContainer className="container" style={{ opacity: loaded ? 1 : 0 }}>
      {resume}
    </ResumeContainer>
  );
}

export default Resume;
