import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
`;

export const Link = styled.a`
  color: #2b00ff;
  text-decoration: none;
  font-weight: 600;

  &:hover,
  &:focus,
  &:visited {
    color: #1c00e5;
  }
`;

export const ResumeTitle = styled.h1`
  font-size: 1.2rem;
  margin-bottom: 30px;
  font-weight: 700;
`;

export const ResumeHeading = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 0;
`;

export const ResumeDates = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
`;

export const ResumeText = styled.p<{ hasDates: boolean }>`
  margin-top: 5px;
  margin-bottom: ${(props) => (!props.hasDates ? '60px' : '0')};
`;

export const ResumeLink = styled(Link)`
  font-weight: 400;
`;

export const ResumeBlockQuote = styled.div`
  border-left: 3px solid #0f222b;
  padding: 5px 15px;
  margin: 10px 0 30px 0;
`;
