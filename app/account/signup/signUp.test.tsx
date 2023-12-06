import {
  render, fireEvent , screen, waitFor,
} from '@testing-library/react';
import SignUp from "@/app/account/signup/page";
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

const onSubmitFunc = jest.fn();
jest.mock('./useSignup', () => ({
  useSignup: () => ({
    isLoading: false,
    onSubmit: onSubmitFunc,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('signUp', () => {
  it('should render signup page successfully', () => {
    const { getByText } = render(<SignUp />);
    const header = getByText(/Create an account/i);

    expect(header).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const {
      getByTestId,
    } = render(<SignUp />);
    const submitButton = screen.getByTestId('submit-button');
    const checkbox = getByTestId('terms-and-conditions')

    await act(async () => {
      await userEvent.type(getByTestId('first-name'), 'John');
      await userEvent.type(getByTestId('last-name'), 'Doe');
      await userEvent.type(getByTestId('email'), 'john.doe@example.com');
      await userEvent.type(getByTestId('password'), 'Passw0rd1234');
      await userEvent.type(getByTestId('password-confirmation'),'Passw0rd1234');
      await userEvent.click(checkbox);
    });

    await waitFor(async () => {
      fireEvent.submit(submitButton);
      expect(checkbox).toBeChecked();
    });
  });

  it('Show error message when passwords do not match', async () => {
    render(<SignUp />);
    const passwordInput = screen.getByTestId('password');
    const passwordConfirmationInput = screen.getByTestId('password-confirmation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(passwordConfirmationInput, { target: { value: 'password456' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please make sure your passwords match')).toBeInTheDocument();
    });
  });

  it('Show error message when submitting the form with missing fields', async () => {
    render(<SignUp />);
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.click(submitButton);

    const errorMsg = screen.getByTestId('first-name')
    await waitFor(() => {
      expect(errorMsg).toBeInTheDocument();
      expect(screen.getByText('You must agree to Privacy Policy to proceed')).toBeInTheDocument();
    });
  });
});
