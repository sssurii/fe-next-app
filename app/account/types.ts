export type SignInDTO = {
  email: string;
  password: string;
  remember?: boolean;
};

export type SignUpDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  termsAndConditions: boolean;
};

export type SignUpResponseDTO = {
  data: User & Token;
}

export type ForgotPasswordDTO = {
  email: string;
}

export type ResetPasswordDTO = {
  token?: string;
  email?: string;
  password: string;
  passwordConfirmation: string;
}

export type SignInResponseDTO = {
  data: User & Token;
}

export type User = {
  id: number;
  email: string;
}

export type Token = {
  token: string;
  type?: string;
}

export type AuthState = {
  user: User | null
  token: Token | null
}

export type SignupRequestResponse = {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
  };
  message: string;
  status: string;
}

export type ForgotPasswordRequestResponse = {
  message: string;
  status: string;
}
