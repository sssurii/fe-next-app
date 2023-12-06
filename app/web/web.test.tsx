import React from 'react';
import { useSession } from "next-auth/react";
import {
  render, screen,
} from '@testing-library/react';
import WebPage from '@/app/web/page';
import { userSessionMock } from "@/common/utils/tests/mocks";

jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
  }
})
jest.mock("next-auth/react")

describe('Boilerplate welcome screen', () => {
  (useSession as jest.Mock).mockReturnValue({
    data: userSessionMock,
    status: 'authenticated',
  });

  it('should render boilerplate welcome screen', () => {
    render(<WebPage />);
    const headerElement = screen.getByText('Platform Template');
    expect(headerElement).toBeInTheDocument();
  });
});
