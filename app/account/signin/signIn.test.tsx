import { render } from '@testing-library/react';
import { useRouter } from "next/navigation";
import SignIn from "@/app/account/signin/page";
import { useSession } from "next-auth/react";
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

jest.mock('next/navigation', () => {
  const router = {
    push: jest.fn(),
    query: {},
  }
  return {
    useRouter: jest.fn().mockReturnValue(router),
  }
});
jest.mock("next-auth/react");

(useSession as jest.Mock).mockReturnValue({
  data: undefined,
  status: 'unauthenticated',
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useSignIn', () => {
  it('should render sign in page successfully', () => {
    const { getByText } = render(<SignIn />);
    const header = getByText(/Sign in to your account/i);
    expect(header).toBeInTheDocument();
  });

  it('should show invalid email format error', async () => {
    const {
      getByText, getByTestId,
    } = render(<SignIn />);
    const emailField = getByTestId('email');
    const submitButton = getByTestId('submit-button');

    await act(async () => {
      await userEvent.type(emailField, 'wrong_email@');
      await userEvent.click(submitButton);
    });

    expect(emailField).toHaveValue('wrong_email@');
    expect(getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('should show invalid password format error', async () => {
    const {
      getByText, getByTestId,
    } = render(<SignIn />);
    const emailField = getByTestId('email');
    const passwordField = getByTestId('password');
    const submitButton = getByTestId('submit-button');

    await act(async () => {
      await userEvent.type(emailField, 'test@example.com');
      await userEvent.type(passwordField, 'wrong_password');
      await userEvent.click(submitButton);
    });

    expect(emailField).toHaveValue('test@example.com');
    expect(passwordField).toHaveValue('wrong_password');
    expect(getByText(/Please enter a valid password/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('should allow user to sign in', async () => {
    const { getByTestId } = render(<SignIn />);
    const emailField = getByTestId('email');
    const passwordField = getByTestId('password');
    const submitButton = getByTestId('submit-button');

    await act(async () => {
      await userEvent.type(emailField, 'test@example.com');
      await userEvent.type(passwordField, 'Test@123');
    });

    expect(emailField).toHaveValue('test@example.com');
    expect(passwordField).toHaveValue('Test@123');
    expect(submitButton).not.toBeDisabled();

    await act(async () => {
      await userEvent.click(submitButton);
    });

    expect(useRouter().push).toHaveBeenCalledTimes(1);
    expect(useRouter().push).toHaveBeenCalledWith('/dashboard');
  })
});
