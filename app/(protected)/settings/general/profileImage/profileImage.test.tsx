import {
  render, screen,
} from '@testing-library/react';
import { useSession } from "next-auth/react";
import { ProfileImage } from "@/app/(protected)/settings/general/profileImage";
import { userSessionMock } from "@/common/utils/tests/mocks";
import { userEvent } from "@testing-library/user-event";

jest.mock("next-auth/react");

const handleFileChangeMock = jest.fn();
jest.mock('./hooks/useUserImageData', () => ({
  useUserImageData: () => ({
    handleFileChange: handleFileChangeMock,
    isCropperOpen: false,
    isConfirmationOpen: false,
  }),
}));

describe('Profile image upload', () => {
  const user = userEvent.setup();

  (useSession as jest.Mock).mockReturnValue({
    data: userSessionMock,
    status: 'authenticated',
  });

  it('should allow to upload an image', async () => {
    render(<ProfileImage />);
    const file = new File(['Picture'], 'user.png', { type: 'image/png' })
    const input: HTMLInputElement = screen.getByTestId('upload-user-image-input');

    await user.upload(input, file)
    expect(handleFileChangeMock).toHaveBeenCalledTimes(1);
  })
})
