import { render } from '@testing-library/react';
import ResetPassword from './page';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const mockedProps = {
  searchParams: {
    email: 'test_email',
  },
  params: {
    token: 'test_token',
  },
}

describe('passwordReset', () => {
  const user = userEvent.setup();
  const correctPassword = 'Test@123';
  const wrongPassword = 'Test@123abcdf';

  it('should render reset password page successfully', () => {
    const { getByText } = render(<ResetPassword {...mockedProps} />);
    const header = getByText(/Please enter your new password/i);
    expect(header).toBeInTheDocument();
  });

  it('should show error message when new password is not matching criteria', async () => {
    const {
      getByTestId, getByText,
    } = render(<ResetPassword {...mockedProps} />);
    const passwordField = getByTestId('password');
    const passwordConfirmationField = getByTestId('password-confirmation');
    const submitButton = getByTestId('reset-password');

    await act( async () => {
      await user.type(passwordField, 'test');
      await user.type(passwordConfirmationField, 'test');
    });

    expect(passwordField).toHaveValue('test');
    expect(passwordConfirmationField).toHaveValue('test');
    expect(getByText(/Please enter a valid password/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('should show error message when passwords meets criteria but not match', async () => {
    const {
      getByTestId, getByText,
    } = render(<ResetPassword {...mockedProps} />);
    const passwordField = getByTestId('password');
    const passwordConfirmationField = getByTestId('password-confirmation');
    const submitButton = getByTestId('reset-password');

    await act( async () => {
      await user.type(passwordField, correctPassword);
      await user.type(passwordConfirmationField, wrongPassword);
      await user.click(submitButton);
    });

    expect(passwordField).toHaveValue(correctPassword);
    expect(passwordConfirmationField).toHaveValue(wrongPassword);
    expect(getByText(/Please make sure your passwords match/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('should let user submit form when passwords match all criteria', async () => {
    const { getByTestId } = render(<ResetPassword {...mockedProps} />);
    const passwordField = getByTestId('password');
    const passwordConfirmationField = getByTestId('password-confirmation');
    const submitButton = getByTestId('reset-password');

    await act( async () => {
      await user.type(passwordField, correctPassword);
      await user.type(passwordConfirmationField, correctPassword);
    });

    expect(passwordField).toHaveValue(correctPassword);
    expect(passwordConfirmationField).toHaveValue(correctPassword);
    expect(submitButton).not.toBeDisabled();
  });
});

