import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from './Home';
import ReactGA from 'react-ga';

jest.mock('react-ga');

describe('Home', () => {
  test('renders', () => {
    process.env.REACT_APP_BLURB_JSON = JSON.stringify({
      text: 'test blurb',
      links: [],
    });
    render(<Home />);
    const textElement = screen.getByText(/Daniel Thengvall/i);
    expect(textElement).toBeInTheDocument();
  });

  test('should throw error, no blurb json set', () => {
    delete process.env.REACT_APP_BLURB_JSON;
    expect(() => {
      render(<Home />);
    }).toThrowError(new Error('REACT_APP_BLURB_JSON not set!'));
  });

  test('renders with blurb json', () => {
    process.env.REACT_APP_BLURB_JSON = JSON.stringify({
      text: 'test blurb linkOne, linkTwo, and linkThree.',
      links: [
        {
          text: 'linkOne',
          url: 'https://linkOne',
          category: 'linkOneCategory',
          action: 'linkOneAction',
          label: 'linkOneLabel',
        },
        {
          text: 'linkTwo',
          url: 'https://linkTwo',
          category: 'linkTwoCategory',
          action: 'linkTwoAction',
          label: 'linkTwoLabel',
        },
        {
          text: 'linkThree',
          url: 'https://linkThree',
          category: 'linkThreeCategory',
          action: 'linkThreeAction',
          label: 'linkThreeLabel',
        },
      ],
    });
    render(<Home />);
    const blurb = screen.getByTestId('blurb');
    expect(blurb.textContent).toBe(
      'test blurb linkOne, linkTwo, and linkThree.',
    );
  });

  test('renders with blurb json, out of order links', () => {
    process.env.REACT_APP_BLURB_JSON = JSON.stringify({
      text: 'test blurb linkOne, linkTwo, and linkThree.',
      links: [
        {
          text: 'linkTwo',
          url: 'https://linkTwo',
          category: 'linkTwoCategory',
          action: 'linkTwoAction',
          label: 'linkTwoLabel',
        },
        {
          text: 'linkThree',
          url: 'https://linkThree',
          category: 'linkThreeCategory',
          action: 'linkThreeAction',
          label: 'linkThreeLabel',
        },
        {
          text: 'linkOne',
          url: 'https://linkOne',
          category: 'linkOneCategory',
          action: 'linkOneAction',
          label: 'linkOneLabel',
        },
      ],
    });
    render(<Home />);
    const blurb = screen.getByTestId('blurb');
    expect(blurb.textContent).toBe(
      'test blurb linkOne, linkTwo, and linkThree.',
    );
  });

  test('click blurb link', async () => {
    process.env.REACT_APP_BLURB_JSON = JSON.stringify({
      text: 'test blurb linkOne, linkTwo, and linkThree.',
      links: [
        {
          text: 'linkOne',
          url: 'https://linkOne',
          category: 'linkOneCategory',
          action: 'linkOneAction',
          label: 'linkOneLabel',
          testId: 'linkOneTestId',
        },
      ],
    });
    const eventSpy = jest.spyOn(ReactGA, 'event').mockReturnValue();
    render(<Home />);
    const linkOne = await screen.findByTestId('linkOneTestId');
    fireEvent.click(linkOne);
    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(eventSpy).toHaveBeenCalledWith({
      category: 'linkOneCategory',
      action: 'linkOneAction',
      label: 'linkOneLabel',
    });
  });

  test('click html resume link', async () => {
    process.env.REACT_APP_BLURB_JSON = JSON.stringify({
      text: 'test blurb',
      links: [],
    });
    const eventSpy = jest.spyOn(ReactGA, 'event').mockReturnValue();
    render(<Home />);
    const webResumeLink = await screen.findByTestId('htmlResumeLink');
    fireEvent.click(webResumeLink);
    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(eventSpy).toHaveBeenCalledWith({
      category: 'Links',
      action: 'Blurb',
      label: 'Resume HTML',
    });
  });

  test('click pdf resume link', async () => {
    process.env.REACT_APP_BLURB_JSON = JSON.stringify({
      text: 'test blurb',
      links: [],
    });
    const eventSpy = jest.spyOn(ReactGA, 'event').mockReturnValue();
    render(<Home />);
    const pdfResumeLink = await screen.findByTestId('pdfResumeLink');
    fireEvent.click(pdfResumeLink);
    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(eventSpy).toHaveBeenCalledWith({
      category: 'Links',
      action: 'Blurb',
      label: 'Resume PDF',
    });
  });

  test('click social link', async () => {
    process.env.REACT_APP_BLURB_JSON = JSON.stringify({
      text: 'test blurb',
      links: [],
    });
    const eventSpy = jest.spyOn(ReactGA, 'event').mockReturnValue();
    render(<Home />);
    const gitHubLink = await screen.findByTestId('gitHubTestId');
    fireEvent.click(gitHubLink);
    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(eventSpy).toHaveBeenCalledWith({
      category: 'Links',
      action: 'Social',
      label: 'GitHub',
    });
  });

  test('loaded state enabled', async () => {
    process.env.REACT_APP_BLURB_JSON = JSON.stringify({
      text: 'test blurb',
      links: [],
    });

    const addEventListenerSpy = jest
      .spyOn(window, 'addEventListener')
      .mockImplementationOnce((event, handler: any) => {
        handler();
      });
    render(<Home />);
    expect(addEventListenerSpy).toHaveBeenCalled();
  });
});
