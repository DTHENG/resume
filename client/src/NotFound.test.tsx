import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import ReactGA from 'react-ga';

jest.mock('react-ga');

describe('NotFound', () => {
  test('renders', () => {
    render(<NotFound />);
    const textElement = screen.getByText(/Page Not Found/i);
    expect(textElement).toBeInTheDocument();
  });

  test('loaded state enabled', async () => {
    const addEventListenerSpy = jest
      .spyOn(window, 'addEventListener')
      .mockImplementationOnce((event, handler: any) => {
        handler();
      });
    render(<NotFound />);
    expect(addEventListenerSpy).toHaveBeenCalled();
  });

  test('click home link', async () => {
    const eventSpy = jest.spyOn(ReactGA, 'event').mockReturnValue();
    render(<NotFound />);
    const homeLink = await screen.findByTestId('homeLinkTestId');
    fireEvent.click(homeLink);
    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(eventSpy).toHaveBeenCalledWith({
      category: 'Links',
      action: 'PageNotFound',
      label: 'Home',
    });
  });

  test('click resume link', async () => {
    const eventSpy = jest.spyOn(ReactGA, 'event').mockReturnValue();
    render(<NotFound />);
    const resumeLink = await screen.findByTestId('resumeLinkTestId');
    fireEvent.click(resumeLink);
    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(eventSpy).toHaveBeenCalledWith({
      category: 'Links',
      action: 'PageNotFound',
      label: 'Resume',
    });
  });
});
