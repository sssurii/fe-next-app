import { render } from '@testing-library/react';
import ForgotPassword from "@/app/account/forgot-password/page";
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'

const wrongEmails = [
  'email',
  'email.domain.com',
  'email@',
  'email@domain',
  'email@domain.',
  'email@domain.-',
  'email@domain-',
  'email@domain..com',
];

beforeEach(() => {
  jest.clearAllMocks();
});

describe('passwordReset', () => {
  const user = userEvent.setup();

  it('should render reset password page successfully', () => {
    const { getByText } = render(<ForgotPassword />);
    const header = getByText(/Please enter your email and we’ll send you instructions on how to reset your password/i);
    expect(header).toBeInTheDocument();
  });

  it('should allow user to submit form if email has correct format', async () => {
    const { getByTestId } = render(<ForgotPassword />);
    const emailField = getByTestId('email');
    const submitButton = getByTestId('send-link');
    const correctEmail = 'email@domain.com';

    await act( async () => {
      await user.type(emailField, correctEmail);
      await user.click(submitButton);
    });

    expect(emailField).toHaveValue(correctEmail);
    expect(submitButton).not.toBeDisabled();
  })

  describe.each(wrongEmails)('for each wrong email format', (email) => {
    it(`should show error message when ${email} is typed`, async () => {
      const {
        getByTestId, getByText,
      } = render(<ForgotPassword />);
      const emailField = getByTestId('email');
      const submitButton = getByTestId('send-link');

      await act( async () => {
        await user.type(emailField, email);
        await user.click(submitButton);
      });

      expect(emailField).toHaveValue(email);
      expect(getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });
});

