import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Resume from './Resume';
import { ResumeComponentType } from './utils';
import ReactGA from 'react-ga';

jest.mock('react-ga');

describe('Resume', () => {
  test('renders', () => {
    process.env.REACT_APP_RESUME_JSON = JSON.stringify([
      {
        type: ResumeComponentType.TITLE,
        text: 'Daniel Thengvall',
      },
    ]);
    render(<Resume />);
    const textElement = screen.getByText(/Daniel Thengvall/i);
    expect(textElement).toBeInTheDocument();
  });

  test('throw error, no resume json set', () => {
    delete process.env.REACT_APP_RESUME_JSON;
    expect(() => {
      render(<Resume />);
    }).toThrowError(new Error('REACT_APP_RESUME_JSON not set!'));
  });

  test('loaded state enabled', async () => {
    process.env.REACT_APP_RESUME_JSON = JSON.stringify([
      {
        type: ResumeComponentType.TITLE,
        text: 'Daniel Thengvall',
      },
    ]);
    const addEventListenerSpy = jest
      .spyOn(window, 'addEventListener')
      .mockImplementationOnce((event, handler: any) => {
        handler();
      });
    render(<Resume />);
    expect(addEventListenerSpy).toHaveBeenCalled();
  });

  test('renders paragraph', () => {
    process.env.REACT_APP_RESUME_JSON = JSON.stringify([
      {
        type: ResumeComponentType.PARAGRAPH,
        text: "I'm a paragraph",
      },
    ]);
    render(<Resume />);
    const textElement = screen.getByText(/I'm a paragraph/i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders paragraph, small font', () => {
    process.env.REACT_APP_RESUME_JSON = JSON.stringify([
      {
        type: ResumeComponentType.PARAGRAPH,
        text: "I'm a paragraph",
        smallFont: true,
      },
    ]);
    render(<Resume />);
    const textElement = screen.getByText(/I'm a paragraph/i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders paragraph, small font + bold', () => {
    process.env.REACT_APP_RESUME_JSON = JSON.stringify([
      {
        type: ResumeComponentType.PARAGRAPH,
        text: "I'm a paragraph",
        smallFont: true,
        bold: 'paragraph',
        testId: 'smallBoldTestId',
      },
    ]);
    render(<Resume />);
    const textElement = screen.getByTestId('smallBoldTestId');
    expect(textElement.textContent).toBe("I'm a paragraph");
  });

  test('renders heading', () => {
    process.env.REACT_APP_RESUME_JSON = JSON.stringify([
      {
        type: ResumeComponentType.HEADING,
        text: "I'm a heading",
      },
    ]);
    render(<Resume />);
    const textElement = screen.getByText(/I'm a heading/i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders dates', () => {
    process.env.REACT_APP_RESUME_JSON = JSON.stringify([
      {
        type: ResumeComponentType.DATES,
        text: "I'm dates",
      },
    ]);
    render(<Resume />);
    const textElement = screen.getByText(/I'm dates/i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders blockquote', () => {
    process.env.REACT_APP_RESUME_JSON = JSON.stringify([
      {
        type: ResumeComponentType.BLOCK_QUOTE,
        text: "I'm a blockquote",
      },
    ]);
    render(<Resume />);
    const textElement = screen.getByText(/I'm a blockquote/i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders space', () => {
    process.env.REACT_APP_RESUME_JSON = JSON.stringify([
      {
        type: ResumeComponentType.SPACE,
        testId: 'spaceTestId',
      },
    ]);
    render(<Resume />);
    const spaceElement = screen.getByTestId('spaceTestId');
    expect(spaceElement).toBeDefined();
  });

  test('renders unknown type', () => {
    process.env.REACT_APP_RESUME_JSON = JSON.stringify([
      {
        type: 'Unknown' as ResumeComponentType,
        text: "I'm an unknown type",
      },
    ]);
    render(<Resume />);
    const textElement = screen.getByText(/I'm an unknown type/i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders empty values', () => {
    const types: ResumeComponentType[] = [
      ResumeComponentType.TITLE,
      ResumeComponentType.PARAGRAPH,
      ResumeComponentType.HEADING,
      ResumeComponentType.DATES,
      ResumeComponentType.BLOCK_QUOTE,
      ResumeComponentType.LINK,
      'Unknown' as ResumeComponentType,
    ];
    process.env.REACT_APP_RESUME_JSON = JSON.stringify(
      types.map((type) => ({
        type,
        testId: `empty_${type}`,
      })),
    );
    render(<Resume />);
    types.forEach((type) => {
      const element = screen.getByTestId(`empty_${type}`);
      expect(element).toBeDefined();
    });
  });

  test('click link', () => {
    process.env.REACT_APP_RESUME_JSON = JSON.stringify([
      {
        type: ResumeComponentType.LINK,
        testId: 'linkTestId',
        test: 'Test Link',
        url: 'https://url',
        category: 'Category',
        action: 'Action',
        label: 'Label',
      },
    ]);
    const eventSpy = jest.spyOn(ReactGA, 'event').mockReturnValue();
    render(<Resume />);
    const linkElement = screen.getByTestId('linkTestId');
    fireEvent.click(linkElement);
    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(eventSpy).toHaveBeenCalledWith({
      category: 'Category',
      action: 'Action',
      label: 'Label',
    });
  });

  test('click link, no google analytics', () => {
    process.env.REACT_APP_RESUME_JSON = JSON.stringify([
      {
        type: ResumeComponentType.LINK,
        testId: 'linkTestId',
        text: 'Test Link',
        url: 'https://url',
      },
    ]);
    const eventSpy = jest.spyOn(ReactGA, 'event').mockReturnValue();
    render(<Resume />);
    const linkElement = screen.getByTestId('linkTestId');
    fireEvent.click(linkElement);
    expect(eventSpy).toHaveBeenCalledTimes(0);
  });

  test('paragraph with bold text', () => {
    process.env.REACT_APP_RESUME_JSON = JSON.stringify([
      {
        type: ResumeComponentType.PARAGRAPH,
        text: "This is a test, I'm bold! This concludes the test.",
        bold: "I'm bold!",
        testId: 'paragraphTest',
      },
    ]);
    render(<Resume />);
    const paragraphElement = screen.getByTestId('paragraphTest');
    expect(paragraphElement).toBeDefined();
    const boldElement = screen.getByTestId('paragraphTest_bold');
    expect(boldElement).toBeDefined();
  });

  test('paragraph with bold text, without test id', () => {
    process.env.REACT_APP_RESUME_JSON = JSON.stringify([
      {
        type: ResumeComponentType.PARAGRAPH,
        text: "This is a test, I'm bold! This concludes the test.",
        bold: "I'm bold!",
      },
    ]);
    render(<Resume />);
    const textElement = screen.getByText(/I'm bold!/i);
    expect(textElement.tagName).toBe('B');
  });
});
