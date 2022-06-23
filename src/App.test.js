import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  render(<App />);
})

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInput = screen.getByRole("textbox", {name: /email/i})
  const passwordInput = screen.getByLabelText("Password")
  const confirmPasswordInput = screen.getByLabelText("Confirm Password")
  
  if(email){
    userEvent.type(emailInput, email)
  }

  if(password){
    userEvent.type(passwordInput, password)
  }

  if(confirmPassword){
    userEvent.type(confirmPasswordInput, confirmPassword)
  }

  return { emailInput, passwordInput, confirmPasswordInput }
}

const submitForm = () => {
  const submitButton = screen.getByRole("button", {name: /submit/i})
  userEvent.click(submitButton)
}

describe("App", () => {
  
  test("inputs should be initially empty", () => {
    const emailInput = screen.getByRole("textbox")
    const passwordInput = screen.getByLabelText("Password")
    const confirmPasswordInput = screen.getByLabelText("Confirm Password")
    expect(emailInput.value).toBe("")
    expect(passwordInput.value).toBe("")
    expect(confirmPasswordInput.value).toBe("")
  })
  
  test("should be able to type an email", () => {
    const {emailInput} = typeIntoForm({email: "test@testmail.com"})
    expect(emailInput.value).toBe("test@testmail.com")
  })
  
  test('should be able to type password', () => {
    const {passwordInput} = typeIntoForm({password: "password!"})
    expect(passwordInput.value).toBe("password!")
  })
  
  test("should be able to type a confirm password", () => {
    const {confirmPasswordInput} = typeIntoForm({confirmPassword: "password!"})
    expect(confirmPasswordInput.value).toBe("password!")
  })
  
  describe("error handling", () => {

    test("should show email error message on invalid email", () => {
      expect(screen.queryByText(/please enter a valid email/i)).not.toBeInTheDocument()
      typeIntoForm({email: "testtestmail.com"})
      submitForm()
      expect(screen.queryByText(/please enter a valid email/i)).toBeInTheDocument()
    })
    
    test("should show error when password is not valid", () => {
      expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).not.toBeInTheDocument()
      typeIntoForm({email: "test@testmail.com", password: "pass"})
      submitForm()
      expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).toBeInTheDocument()
    
    })
    
    test("should passwords match", () => {
      expect(screen.queryByText(/the password you entered should be same please try again/i)).not.toBeInTheDocument()
      typeIntoForm({email: "test@testmail.com", password: "password", confirmPassword: "password!"})
      submitForm()
      expect(screen.queryByText(/the password you entered should be same please try again/i)).toBeInTheDocument()
    })
    
    test("should show no error message if inputs are valid", () => {
      typeIntoForm({email: "test@testmail.com", password: "password", confirmPassword: "password"})
    
      submitForm()
      
      expect(screen.queryByText(/please enter a valid email/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/the password you entered should be same please try again/i)).not.toBeInTheDocument()
    })

  })

})