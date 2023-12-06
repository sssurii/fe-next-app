import {
  renderHook, act,
} from '@testing-library/react-hooks';
import { useSignup } from './useSignup';
import {
  waitFor,
} from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock("next-auth/react");
jest.mock('next/navigation', () => {
  return {
    ...jest.requireActual('next/navigation'),
    useRouter: jest.fn(),
  }
});
const mockedRouterPush = jest.fn();
(useRouter as jest.Mock).mockImplementation(() => ({
  push: mockedRouterPush,
}));

describe("useSignUp", () => {
  it('should register user and redirect to success page', async () => {
    const { result } = renderHook(() => useSignup());
    const { push } = useRouter();

    await act(async () => {
      await result.current.onSubmit({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        passwordConfirmation: 'password123',
        termsAndConditions: true,
      });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('/account/success');
  });
});
