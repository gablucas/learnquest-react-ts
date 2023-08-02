import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { BrowserRouter } from "react-router-dom";


describe('Sidebar', () => {
  it('should render correctly', () => {
    render(<BrowserRouter><Sidebar /></BrowserRouter>)
  })

  expect(screen.getByText("teste")).toBeInTheDocument();
})