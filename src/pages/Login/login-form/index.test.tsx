import { render, screen } from "@testing-library/react"
import LoginForm from "."
import useForm from "../../../hooks/useForm"
import { BrowserRouter } from "react-router-dom";

jest.mock("../../../hooks/useForm");

describe('LoginForm', () => {
  const login = useForm({type: 'test', initialValue: ''})
  const password = useForm({type: 'test', initialValue: ''})

  it('should render correctly', () => {

    render (
    <BrowserRouter>
      <LoginForm login={login} password={password} />
    </BrowserRouter>)

    expect(screen.getByRole('heading', {level: 1})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: 'Login'})).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Entrar'})).toBeInTheDocument();
  })
})