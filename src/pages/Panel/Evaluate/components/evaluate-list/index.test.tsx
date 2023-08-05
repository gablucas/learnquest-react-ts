import { fireEvent, render, screen } from "@testing-library/react"
import EvaluateList from ".";
import { BrowserRouter } from "react-router-dom";
import useData from "../../../../../hooks/useData";

const evaluateTask = [{        
  id: '1',
  lessonID: '1',
  createdby: '1',
  student: '1',
  subject: '1',
  answers: []
}]

jest.mock("../../../../../hooks/useData");

const renderComponent = () => {
  render(
      <BrowserRouter>
        <EvaluateList evaluate={evaluateTask} setMobileInfo={jest.fn()} />
      </BrowserRouter>);
}

describe('EvaluateList', () => {

  it('should render correctly', () => {
    (useData as jest.Mock).mockReturnValue({getUser: jest.fn().mockReturnValue({name: 'Gabriel'}), getSubject: jest.fn().mockReturnValue({name: 'Matemática'})})

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
    (useData as jest.Mock).mockReturnValue({getUser: jest.fn().mockReturnValue({name: 'Gabriel'}), getSubject: jest.fn().mockReturnValue({name: 'Matemática'})})

    renderComponent();

    const evaluateBtn = screen.getByRole('link');

    fireEvent.click(evaluateBtn);

    expect(window.location.pathname).toBe('/painel/avaliar/1')
  })
})