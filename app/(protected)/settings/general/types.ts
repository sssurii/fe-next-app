export type UserDetailsDTO = {
  firstName: string;
  lastName: string;
  email: string;
  newEmail?: string;
  confirmationEmail?: string;
};

export type UserDetailsRequestDTO = {
  firstName: string;
  lastName: string;
  email?: string;
};

export type UserDetailsProps = {
  userDetails: {
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    emailVerifiedAt: string;
    hasSubscribed: boolean;
    id: number;
    image: string;
    imageThumbnail: string;
    initials: string;
    roles: string[];
    updatedAt: string;
  },
  isUpdatingUserDetails: boolean;
  onUserDetailsUpdate: (data: UserDetailsDTO) => void;
};
