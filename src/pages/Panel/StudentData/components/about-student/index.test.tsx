import { render, screen } from "@testing-library/react"
import AboutStudent from "."
import { BrowserRouter } from "react-router-dom";
import { IStudent } from "../../../../../types/Users";
import { ILesson } from "../../../../../types/Lessons";

  const mockStudent: IStudent = {
    id: '1',
    access: 'student',
    name: 'Gabriel',
    login: 'Gabriel',
    email: 'gabriel@gmail.com',
    password: '123',
    status: 'active',
    level: 1,
    xp: 0,
    lessons: [],
  }

  const mockLesson: ILesson[] = [{
    id: '1',
    createdby: '1',
    title: 'teste',
    video: 'teste',
    text: 'teste',
    subject: 'teste',
    task: [],
    groups: ['1'],
    status: 'active'
  }]

function renderComponent() {
  render(
  <BrowserRouter>
    <AboutStudent student={mockStudent} lessonsTodo={mockLesson} />
  </BrowserRouter>
  );
}

describe('AboutStudent', () => {

  it('should render correctly', () => {
    renderComponent();

    expect(screen.getByText('Informações')).toBeInTheDocument();
    expect(screen.getByText(`Nome: ${mockStudent.name}`)).toBeInTheDocument();

    expect(screen.getByText(`Email: ${mockStudent.email}`)).toBeInTheDocument();
    expect(screen.getByText(`Login: ${mockStudent.login}`)).toBeInTheDocument();

    expect(screen.getByText('Progressão')).toBeInTheDocument();
    expect(screen.getByText(`Level: ${mockStudent.level}`)).toBeInTheDocument();
    expect(screen.getByText(`XP Atual: ${mockStudent.xp}`)).toBeInTheDocument();
    expect(screen.getByText(`XP Próx nível: ${mockStudent.level * 125}`)).toBeInTheDocument();
    expect(screen.getByText(`XP Total: ${mockStudent.xp + (mockStudent.level - 1) * 125}`)).toBeInTheDocument();
    expect(screen.getByText('Rank 1')).toBeInTheDocument();

    expect(screen.getByText('Estatísticas')).toBeInTheDocument();
    expect(screen.getByText(`Aulas realizadas: ${mockStudent.lessons.length}`)).toBeInTheDocument();
    expect(screen.getByText(`Aulas a fazer: ${mockLesson.length}`)).toBeInTheDocument();
  })
})