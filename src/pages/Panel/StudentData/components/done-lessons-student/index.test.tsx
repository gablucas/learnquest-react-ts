import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import DoneLessonsStudent from "."
import { IStudent } from "../../../../../types/Users"

const mockStudent: IStudent = {
  id: '1',
  name: 'Gabriel',
  email: 'test',
  login: 'test',
  access: 'student',
  lessons: [],
  level: 1,
  xp: 0,
  password: '123',
  status: 'active',
}

const renderComponent = () => {
  render(
  <BrowserRouter>
    <DoneLessonsStudent student={mockStudent} setMobileInfo={jest.fn()}/>
  </BrowserRouter>)
}


describe('DoneLessonStudent', () => {

  it('shoul render correctly', () => {
    renderComponent();
  })
})