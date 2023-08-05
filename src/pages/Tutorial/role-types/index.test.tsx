import { render, screen } from "@testing-library/react"
import RoleTypes from "."

describe('RoleTypes', () => {

  it('should render correctly', () => {
    render(<RoleTypes />);

    expect(screen.getByText('Tipos de acessos')).toBeInTheDocument();
    expect(screen.getByText('Administrador')).toBeInTheDocument();
    expect(screen.getByText('Tem acesso total')).toBeInTheDocument();
    expect(screen.getByText('Pode criar, editar e excluir usuarios, turmas, matérias, alunos e aulas')).toBeInTheDocument();
    expect(screen.getByText('Pode avaliar tarefas de todos os alunos')).toBeInTheDocument();

    expect(screen.getByText('Professor')).toBeInTheDocument();
    expect(screen.getByText('Pode ver os alunos vinculados a ele')).toBeInTheDocument();
    expect(screen.getByText('Pode criar aulas (somente para a matéria e turma(s) vinculada(s) a ele)')).toBeInTheDocument();
    expect(screen.getByText('Pode avaliar tarefas (somente das suas aulas)')).toBeInTheDocument();

    expect(screen.getByText('Aluno')).toBeInTheDocument();
    expect(screen.getByText('Pode ver as informações dele')).toBeInTheDocument();
    expect(screen.getByText('Pode participar das aulas e fazer tarefas')).toBeInTheDocument();

  })
})