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