import { render, screen, fireEvent } from "@testing-library/react"
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

      expect(screen.getByRole('heading', {level: 2})).toBeInTheDocument();
      expect(screen.getByText('Selecione para preencher automaticamente')).toBeInTheDocument();
      expect(screen.getByRole('button', {name: 'Administrador'})).toBeInTheDocument();
      expect(screen.getByRole('button', {name: 'Professor'})).toBeInTheDocument();
      expect(screen.getByRole('button', {name: 'Aluno'})).toBeInTheDocument();
      expect(screen.getByRole('button', {name: 'Desfazer todas ações'})).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Saiba como funciona" })).toBeInTheDocument();
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