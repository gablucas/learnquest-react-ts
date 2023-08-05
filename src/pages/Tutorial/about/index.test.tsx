import { render, screen } from "@testing-library/react"
import About from "."

describe('About', () => {

  it('Should render correctly', () => {
    render(<About />);

    expect(screen.getByText('O que é a LearnQuest?'));
    expect(screen.getByTestId('textabout'));
  })
})