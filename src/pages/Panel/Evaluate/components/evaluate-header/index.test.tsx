import { render, screen } from "@testing-library/react"
import EvaluateHeader from "."
import { BrowserRouter } from "react-router-dom";

describe('EvaluateHeader', () => {

  it('should render correctly', () => {
    render(<BrowserRouter><EvaluateHeader /></BrowserRouter>);

    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Aluno')).toBeInTheDocument();
    expect(screen.getByText('Criada por')).toBeInTheDocument();
    expect(screen.getByText('Matéria')).toBeInTheDocument();
    expect(screen.getByText('Informações')).toBeInTheDocument();
    expect(screen.getByText('Avaliar')).toBeInTheDocument();
  })
})