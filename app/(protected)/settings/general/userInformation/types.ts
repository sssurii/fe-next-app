export type InputIds = 'firstName' | 'lastName' | 'email' | 'newEmail' | 'confirmationEmail';
export type FormInputProps = {
  name: InputIds;
  'data-cy': string;
  disabled: boolean;
  size?: string;
}

export type UserDetailsRequestResponse = {
  additional_data?: {
    billing_portal_url: string;
  },
  data: {
    id: number;
    email: string;
    email_verified_at: string;
    first_name: string;
    has_subscribed: boolean;
    last_name: string;
    roles: string[];
    created_at: string;
    updated_at: string;
    initials: string;
    image: string | null;
    image_thumbnail: string | null;
  },
  message: string;
}
