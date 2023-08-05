import { fireEvent, render, screen } from "@testing-library/react"
import Tutorial from "."
import { BrowserRouter } from "react-router-dom";

describe('Tutorial', () => {

  it('should render correctly', () => {
    render(<BrowserRouter><Tutorial /></BrowserRouter>);

    expect(screen.getByRole('link', { name : 'Voltar para a página de login' })).toBeInTheDocument();
  })

  it('should navigate to when click on Voltar para a página de login link', () => {
    render(<BrowserRouter><Tutorial /></BrowserRouter>);

    const returnLink = screen.getByRole('link', { name : 'Voltar para a página de login' });

    fireEvent.click(returnLink);

    expect(window.location.pathname).toBe('/');
  })
})