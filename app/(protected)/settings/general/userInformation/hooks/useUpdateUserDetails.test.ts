import { useSession } from "next-auth/react";
import { renderHook } from "@testing-library/react-hooks";
import { useUpdateUserDetails } from "@/app/(protected)/settings/general/userInformation/hooks";
import { hookWrapper } from "@/common/utils/tests/hookWrapper";
import { act } from "@testing-library/react";
import { userSessionMock } from "@/common/utils/tests/mocks";

jest.mock("next-auth/react");

const mockedNewUserDetails = {
  firstName: 'Anakin',
  lastName: 'Skywalker',
  email: 'kenobi@example.com',
  newEmail: 'anakin@example.com',
}
const mockedNewUserDetailsResponse = {
  data: {
    email: "anakin@example.com",
    'first_name': "Anakin",
    'last_name': "Skywalker",
  },
  status: 200,
  code: 200,
  message: 'Profile updated successfully.',
}

describe('useUpdateUserDetails', () => {
  (useSession as jest.Mock).mockReturnValue({
    data: userSessionMock,
    status: 'authenticated',
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update user profile details', async () => {
    const { result } = renderHook(() => useUpdateUserDetails(), { wrapper: hookWrapper });

    await act(async () => {
      await result.current.onUserDetailsUpdate(mockedNewUserDetails);
    });

    expect(result.current.isUpdatingUserDetails).toBe(false);
    expect(result.current.updatedUserDetails).toEqual(mockedNewUserDetailsResponse);
  })
})
