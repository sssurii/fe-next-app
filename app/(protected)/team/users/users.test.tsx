import { render } from '@testing-library/react';
import { useSession } from "next-auth/react";
import Users from "@/app/(protected)/team/users";
import { renderHook } from "@testing-library/react-hooks";
import { useGetInfiniteUsers } from "@/app/(protected)/team/users/useGetInfiniteUsers";
import { hookWrapper } from "@/common/utils/tests/hookWrapper";
import { userSessionMock } from "@/common/utils/tests/mocks";

jest.mock("next-auth/react");

const mockedUsers = [{
  id: 1,
  name: 'John Doe',
  first_name: 'John',
  last_name: 'Doe',
  email: 'doe@example.com',
  email_verified_at: '01 Jul 2021',
}, {
  id: 2,
  name: 'Erica Glamour',
  first_name: 'Erica',
  last_name: 'Glamour',
  email: 'glamour@example.com',
  email_verified_at: '01 Jul 2021',
}];

describe('Users', () => {
  (useSession as jest.Mock).mockReturnValue({
    data: userSessionMock,
    status: 'authenticated',
  });

  it('should render users page successfully', () => {
    const { getByTestId } = render(<Users />);
    expect(getByTestId('users-table')).toBeInTheDocument();
  });

  it('should return users list from request response on hook load', async () => {
    const {
      result, waitForNextUpdate,
    } = renderHook(() => useGetInfiniteUsers(), { wrapper: hookWrapper });
    expect(result.current.usersLoader).toBe(true);
    expect(result.current.error).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.usersLoader).toBe(false);
    expect(result.current.error).toBe(undefined);
    expect(result.current.users).toEqual(mockedUsers);
  });
});
