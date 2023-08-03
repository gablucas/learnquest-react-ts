import { fireEvent, render, screen } from "@testing-library/react"
import Header from "."
import { BrowserRouter } from "react-router-dom";
import useData from "../../hooks/useData";

jest.mock("../../hooks/useData")

describe("Header", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders correctly', () => {
    (useData as jest.Mock).mockReturnValue({ getLoggedUser: jest.fn().mockReturnValue(undefined)});
    
    render(<BrowserRouter><Header /></BrowserRouter>);

    const logoLink = screen.getByRole('presentation');
    const logoImage = screen.getByAltText("logo");

    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toContainElement(logoImage);
  })

  it('should render when user is not logged in', () => {
    (useData as jest.Mock).mockReturnValue({ getLoggedUser: jest.fn().mockReturnValue(undefined)});

    render(<BrowserRouter><Header /></BrowserRouter>);

    expect(screen.getByRole("link", { name: 'Entrar' })).toBeInTheDocument();
    expect(screen.queryByTestId("username")).not.toBeInTheDocument();
  })

  it('should render when user is logged in', () => {
    (useData as jest.Mock).mockReturnValue({ getLoggedUser: jest.fn().mockReturnValue({ access: 'student', name: 'Gabriel' })});

    render(<BrowserRouter><Header /></BrowserRouter>);

    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: 'Entrar' })).not.toBeInTheDocument();
  })

  it('should navigate to / when click on "Logo" link', () => {
    (useData as jest.Mock).mockReturnValue({ getLoggedUser: jest.fn().mockReturnValue(undefined)});

    render(<BrowserRouter><Header /></BrowserRouter>);

    const logoLink = screen.getByRole("presentation");

    fireEvent.click(logoLink);

    expect(window.location.pathname).toBe('/');
  })

  it('should navigate to / when click on "Entrar" link', () => {
    (useData as jest.Mock).mockReturnValue({ getLoggedUser: jest.fn().mockReturnValue(undefined)});

    render(<BrowserRouter><Header /></BrowserRouter>);

    const loginLink = screen.getByRole("link", { name: 'Entrar' });

    fireEvent.click(loginLink);

    expect(window.location.pathname).toBe('/');
  })

  it('should navigate to /estudante when student click on his name', () => {
    (useData as jest.Mock).mockReturnValue({ getLoggedUser: jest.fn().mockReturnValue({ access: 'teacher', name: 'Gabriel' })});

    render(<BrowserRouter><Header /></BrowserRouter>);

    const loginLink = screen.getByTestId("username");

    fireEvent.click(loginLink);

    expect(window.location.pathname).toBe('/estudante');
  })

  it('should navigate to /painel when admin/teacher click on his name', () => {
    (useData as jest.Mock).mockReturnValue({ getLoggedUser: jest.fn().mockReturnValue({ access: 'admin', name: 'Gabriel' })});

    render(<BrowserRouter><Header /></BrowserRouter>);

    const loginLink = screen.getByTestId("username");

    fireEvent.click(loginLink);

    expect(window.location.pathname).toBe('/painel');
  })
})