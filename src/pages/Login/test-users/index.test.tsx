import { fireEvent, render, screen } from "@testing-library/react"
import TestUsers from "."
import useForm from "../../../hooks/useForm"
import { BrowserRouter } from "react-router-dom"

jest.mock("../../../hooks/useForm")

describe("TestUsers", () => {
  const login = useForm({type: 'test', initialValue: ''});
  const password = useForm({type: 'test', initialValue: ''});

  it('should render correctly', () => {

    render(
      <BrowserRouter>
        <TestUsers login={login} password={password} />
      </BrowserRouter>
      )

    expect(screen.getByText("Contas para teste")).toBeInTheDocument();
    expect(screen.getByText("Administrador")).toBeInTheDocument();
    expect(screen.getByText("Professor")).toBeInTheDocument();
    expect(screen.getByText("Aluno")).toBeInTheDocument();
    expect(screen.getByText("Defazer todas ações")).toBeInTheDocument();
    expect(screen.getByText("Defazer todas ações")).toBeInTheDocument();
    expect(screen.getByText("Saiba como funciona")).toBeInTheDocument();
  })

  it('should navigate to tutorial when click on Saiba como funciona link', () => {

    render(
      <BrowserRouter>
        <TestUsers login={login} password={password} />
      </BrowserRouter>
      )

    const tutorialLink = screen.getByRole("link", { name: "Saiba como funciona" });

    fireEvent.click(tutorialLink);

    expect(window.location.pathname).toBe('/tutorial');
  })
})