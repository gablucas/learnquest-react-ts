import { fireEvent, render, screen } from "@testing-library/react";
import Sidebar from ".";
import { BrowserRouter } from "react-router-dom";
import * as userHasAccess from '../../../helpers/user/userHasAccess';

const mockUserHasAccess = jest.spyOn(userHasAccess, 'userHasAccess');


describe('Sidebar', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it ('should render correctly', () => {
    mockUserHasAccess.mockReturnValue(true);

    render(<BrowserRouter><Sidebar /></BrowserRouter>)

    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Visão geral")).toBeInTheDocument();
    expect(screen.getByText('Alunos')).toBeInTheDocument();
    expect(screen.getByText("Aulas")).toBeInTheDocument();
    expect(screen.getByText("Avaliar tarefas")).toBeInTheDocument();
  })

  it('should render for admin permission', () => {
    mockUserHasAccess.mockReturnValue(true);
    
    render(<BrowserRouter><Sidebar /></BrowserRouter>)

    expect(screen.getByText('Usuários')).toBeInTheDocument();
    expect(screen.getByText('Turmas')).toBeInTheDocument();
    expect(screen.getByText('Matérias')).toBeInTheDocument();
    expect(screen.getByText("Preferências")).toBeInTheDocument();
  })

  it('should not render for teacher permission', () => {
    mockUserHasAccess.mockReturnValue(false);

    render(<BrowserRouter><Sidebar /></BrowserRouter>)

    expect(screen.queryByRole('Usuários')).not.toBeInTheDocument();
    expect(screen.queryByText('Turmas')).not.toBeInTheDocument();
    expect(screen.queryByText('Matérias')).not.toBeInTheDocument();
    expect(screen.queryByText("Preferências")).not.toBeInTheDocument();
  });
  
  it('should navigate to /painel when click on "Visão geral" link', () => {
    mockUserHasAccess.mockReturnValue(true);

    render(<BrowserRouter><Sidebar /></BrowserRouter>)

    const panelLink = screen.getByRole("link", { name: "Visão geral"});

    fireEvent.click(panelLink);

    expect(window.location.pathname).toBe('/painel');
  })

  it('should navigate to /usuarios when click on "Usuários" link', () => {
    mockUserHasAccess.mockReturnValue(true);

    render(<BrowserRouter><Sidebar /></BrowserRouter>)

    const usersLink = screen.getByRole("link", { name: "Usuários" });

    fireEvent.click(usersLink);

    expect(window.location.pathname).toBe('/usuarios');
  })

  it('should navigate to /turmas when click on "Turmas" link', () => {
    mockUserHasAccess.mockReturnValue(true);

    render(<BrowserRouter><Sidebar /></BrowserRouter>)

    const groupsLink = screen.getByRole("link", { name: "Turmas" });

    fireEvent.click(groupsLink);

    expect(window.location.pathname).toBe('/turmas');
  })

  it('should navigate to /materias when click on "Matérias" link', () => {
    mockUserHasAccess.mockReturnValue(true);

    render(<BrowserRouter><Sidebar /></BrowserRouter>)

    const subjectsLink = screen.getByRole("link", { name: "Matérias" });

    fireEvent.click(subjectsLink);

    expect(window.location.pathname).toBe('/materias');
  })

  it('should navigate to /alunos when click on "Alunos" link', () => {
    mockUserHasAccess.mockReturnValue(true);

    render(<BrowserRouter><Sidebar /></BrowserRouter>)

    const studentsLink = screen.getByRole("link", { name: "Alunos" });

    fireEvent.click(studentsLink);

    expect(window.location.pathname).toBe('/alunos');
  })

  it('should navigate to /aulas when click on "Aulas" link', () => {
    mockUserHasAccess.mockReturnValue(true);

    render(<BrowserRouter><Sidebar /></BrowserRouter>)

    const lessonsLink = screen.getByRole("link", { name: "Aulas" });

    fireEvent.click(lessonsLink);

    expect(window.location.pathname).toBe('/aulas');
  })

  it('should navigate to /avaliar when click on "Avaliar tarefas" link', () => {
    mockUserHasAccess.mockReturnValue(true);

    render(<BrowserRouter><Sidebar /></BrowserRouter>)

    const evaluateLink = screen.getByRole("link", { name: "Avaliar tarefas" });

    fireEvent.click(evaluateLink);

    expect(window.location.pathname).toBe('/avaliar');
  })

  it('should navigate to /preferencias when click on "Preferências" link', () => {
    mockUserHasAccess.mockReturnValue(true);

    render(<BrowserRouter><Sidebar /></BrowserRouter>)

    const preferencesLink = screen.getByRole("link", { name: "Preferências" });

    fireEvent.click(preferencesLink);

    expect(window.location.pathname).toBe('/preferencias');
  })
})