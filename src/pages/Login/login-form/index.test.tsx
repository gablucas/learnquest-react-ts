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

    expect(screen.getByText("Faça o login")).toBeInTheDocument();
    expect(screen.getByRole("form")).toBeInTheDocument();


    expect(screen.getByText("Entrar")).toBeInTheDocument();
  })
})