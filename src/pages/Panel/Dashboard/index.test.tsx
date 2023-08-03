import { render, screen } from "@testing-library/react";
import Dashboard from ".";


describe('Dashboard', () => {
  it('should render correctly', () => {
    render(<Dashboard />)
    
    expect(screen.getByText("Administradores")).toBeInTheDocument();
    expect(screen.getByText("Professores")).toBeInTheDocument();
    expect(screen.getByText("Alunos")).toBeInTheDocument();
    expect(screen.getByText("Aulas")).toBeInTheDocument();
    expect(screen.getByText("Alunos online")).toBeInTheDocument();
    expect(screen.getByText("Professores online")).toBeInTheDocument();
  })

})