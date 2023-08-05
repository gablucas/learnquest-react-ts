import { render, screen } from "@testing-library/react"
import Faq from "."

describe('Faq', () => {

  it('should render correctly', () => {
    render(<Faq />);

    expect(screen.getByText('Dúvidas')).toBeInTheDocument();
    expect(screen.getByText('O aluno é identificado pela sua turma, ou seja, é necessário ter uma turma criada com os alunos vínculados a ela. Dessa forma ao criar uma aula basta selecionar a turma (conjunto de alunos) que vão ter acesso a aquela aula.')).toBeInTheDocument();
    
    expect(screen.getByText('O que acontece após o aluno finalizar a aula?')).toBeInTheDocument();
    expect(screen.getByTestId('mainspan')).toBeInTheDocument();
  })

})