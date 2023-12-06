import { useGetUserDetails } from "@/app/(protected)/settings/general/userInformation/hooks";
import { useSession } from "next-auth/react";
import { renderHook } from "@testing-library/react-hooks";
import { userSessionMock } from "@/common/utils/tests/mocks";

jest.mock("next-auth/react");

const mockedUserDetails = {
  firstName: 'Obi Wan',
  lastName: 'Kenobi',
  email: 'kenobi@example.com',
};

describe('useGetUserDetails', () => {
  (useSession as jest.Mock).mockReturnValue({
    data: userSessionMock,
    status: 'authenticated',
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return user details from request response on hook load', async () => {
    const {
      result, waitForNextUpdate,
    } = renderHook(() => useGetUserDetails());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isValidating).toBe(true);
    expect(result.current.error).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isValidating).toBe(false);
    expect(result.current.error).toBe(undefined);
    expect(result.current.userDetails).toEqual(mockedUserDetails);
  });
});
