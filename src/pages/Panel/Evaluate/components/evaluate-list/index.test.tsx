import { fireEvent, render, screen } from "@testing-library/react"
import EvaluateList from ".";
import { BrowserRouter } from "react-router-dom";
import * as getUser from "../../../../../helpers/user/getUser";
import * as getSubject from "../../../../../helpers/subject/getSubject";

const evaluateTask = [{        
  id: '1',
  lessonID: '1',
  createdby: '1',
  student: '1',
  subject: '1',
  answers: []
}]

const mockGetUser = jest.spyOn(getUser, "getUser");
const mockGetSubject = jest.spyOn(getSubject, "getSubject");


const renderComponent = () => {
  render(
      <BrowserRouter>
        <EvaluateList evaluate={evaluateTask} setMobileInfo={jest.fn()} />
      </BrowserRouter>);
}

describe('EvaluateList', () => {

  it('should render correctly', () => {
    mockGetUser.mockReturnValue({id: 'U1', name: 'Gabriel', email: 'test', access: 'student', lessons: [], level: 1, xp: 0, login: 'test', password: 'test', status: 'active'});
    mockGetSubject.mockReturnValue({id: 'S1', name: 'Matemática', status: 'active', teachers: ['T1']});

    renderComponent();
    
    expect(screen.getByTestId('lessontitle')).toBeInTheDocument();
    const getUserElements = screen.getAllByText('Gabriel');
    expect(getUserElements[0]).toBeInTheDocument();
    expect(getUserElements[1]).toBeInTheDocument();
    expect(screen.getByText('Matemática')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  })

  it('should navigate /painel/avaliar/id to when click on EvaluateIcon link', () => {
    mockGetUser.mockReturnValue({id: 'U1', name: 'Gabriel', email: 'test', access: 'student', lessons: [], level: 1, xp: 0, login: 'test', password: 'test', status: 'active'});
    mockGetSubject.mockReturnValue({id: 'S1', name: 'Matemática', status: 'active', teachers: ['T1']});

    renderComponent();

    const evaluateBtn = screen.getByRole('link');

    fireEvent.click(evaluateBtn);

    expect(window.location.pathname).toBe('/painel/avaliar/1')
  })
})