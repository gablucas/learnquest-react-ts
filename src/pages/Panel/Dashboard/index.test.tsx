import { render, screen } from "@testing-library/react";
import Dashboard from ".";


describe('Dashboard', () => {
  it('should render correctly', () => {
    render(<Dashboard />)
    
    expect(screen.getByText("Administradores")).toBeInTheDocument();
  })

})