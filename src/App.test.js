import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test("inputs should be initially empty", () => {
  render(<App />)
  const emailInput = screen.getByRole("textbox")
  const passwordInput = screen.getByLabelText("Password")
  const confirmPasswordInput = screen.getByLabelText("Confirm Password")
  expect(emailInput.value).toBe("")
  expect(passwordInput.value).toBe("")
  expect(confirmPasswordInput.value).toBe("")
})

test("should be able to type an email", () => {
  render(<App />)
  const emailInput = screen.getByRole("textbox", {name: /email/i})
  userEvent.type(emailInput, "test@test.com")
  expect(emailInput.value).toBe("test@test.com")
})

test('should be able to type password', () => {
  render(<App />)
  const passwordInput = screen.getByLabelText("Password")
  userEvent.type(passwordInput, "password!")
  expect(passwordInput.value).toBe("password!")
})

test("should be able to type a confirm password", () => {
  render(<App />)
  const confirmPasswordInput = screen.getByLabelText("Confirm Password")
  userEvent.type(confirmPasswordInput, "password!")
  expect(confirmPasswordInput.value).toBe("password!")
})

test("should show email error message on invalid email", () => {
  render(<App />)

  const emailErrorMessage = screen.queryByText(/please enter a valid email/i)
  const emailInput = screen.getByRole("textbox", {name: /email/i})
  const submitButton = screen.getByRole("button", {name: /submit/i})

  expect(emailErrorMessage).not.toBeInTheDocument()
  userEvent.type(emailInput, "testtest.com")
  userEvent.click(submitButton)
  const emailErrorMessageV2 = screen.queryByText(/please enter a valid email/i)
  expect(emailErrorMessageV2).toBeInTheDocument()
})

test("should show error when password is not valid", () => {
  render(<App/>)
  const emailInput = screen.getByRole("textbox", {name: /email/i})
  const passwordInput = screen.getByLabelText("Password")
  const passwordError = screen.queryByText(/the password you entered should contain 5 or more characters/i)
  const submitButton = screen.getByRole("button", {name: /submit/i})

  expect(passwordError).not.toBeInTheDocument()
  userEvent.type(emailInput, "test@test.com")
  userEvent.type(passwordInput, "pass")
  userEvent.click(submitButton)
  const passwordErrorV2 = screen.queryByText(/the password you entered should contain 5 or more characters/i)
  expect(passwordErrorV2).toBeInTheDocument()

})

test("should passwords match", () => {
  render(<App/>)
  const emailInput = screen.getByRole("textbox", {name: /email/i})
  const passwordInput = screen.getByLabelText("Password")
  const confirmPasswordInput = screen.getByLabelText("Confirm Password")
  const submitButton = screen.getByRole("button", {name: /submit/i})
  const passwordError = screen.queryByText(/the password you entered should be same please try again/i)

  userEvent.type(emailInput, "test@test.com")
  userEvent.type(passwordInput, "12345")

  expect(passwordError).not.toBeInTheDocument()
  
  userEvent.type(confirmPasswordInput, "123456")
  userEvent.click(submitButton)
  const passwordErrorV2 = screen.queryByText(/the password you entered should be same please try again/i)
  expect(passwordErrorV2).toBeInTheDocument()
})

test("should show no error message if inputs are valid", () => {
  render(<App/>)
  const emailInput = screen.getByRole("textbox", {name: /email/i})
  const passwordInput = screen.getByLabelText("Password")
  const confirmPasswordInput = screen.getByLabelText("Confirm Password")
  const submitButton = screen.getByRole("button", {name: /submit/i})
  
  userEvent.type(emailInput, "test@test.com")
  userEvent.type(passwordInput, "12345")
  userEvent.type(confirmPasswordInput, "12345")
  userEvent.click(submitButton)

  const emailErrorMessage = screen.queryByText(/please enter a valid email/i)
  const passwordError = screen.queryByText(/the password you entered should contain 5 or more characters/i)
  const confirmPasswordError = screen.queryByText(/the password you entered should be same please try again/i)
  
  expect(emailErrorMessage).not.toBeInTheDocument()
  expect(passwordError).not.toBeInTheDocument()
  expect(confirmPasswordError).not.toBeInTheDocument()
})