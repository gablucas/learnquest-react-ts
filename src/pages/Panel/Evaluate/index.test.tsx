import { render, screen } from "@testing-library/react"
import Evaluate from "."
import { BrowserRouter } from "react-router-dom"
import { useHelpers } from "../../../hooks/useHelpers"

jest.mock("../../../hooks/useHelpers");

describe('Evaluate', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    (useHelpers as jest.Mock).mockReturnValue({isAnyArrayFilled: jest.fn().mockReturnValue(false), isArrayEmpty: jest.fn().mockReturnValue(false)})

    render(<BrowserRouter><Evaluate /></BrowserRouter>);

    expect(screen.getByText('Filtrar')).toBeInTheDocument();
    expect(screen.queryByText('Limpar filtro')).not.toBeInTheDocument();
  })

  it('the Limpar Filtro button should appear when the isAnyArrayFilled return true', () => {
    (useHelpers as jest.Mock).mockReturnValue({isAnyArrayFilled: jest.fn().mockReturnValue(true), isArrayEmpty: jest.fn().mockReturnValue(false)})

    render(<BrowserRouter><Evaluate /></BrowserRouter>);

    expect(screen.getByText('Limpar filtro')).toBeInTheDocument();
  })
})