import { ChangeEvent } from "react";

export type User = {
  id: number;
  email: string;
  email_verified_at: string | null;
  first_name: string;
  last_name: string;
  has_subscribed: boolean;
  image: string | null;
  image_thumbnail: string | null;
  initials: string;
  updated_at: string | null;
  created_at: string;
  roles: string[];
}

type UsersResponseLink = {
  url: string | null;
  label: string;
  active: boolean;
}

type UsersResponseMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: UsersResponseLink,
  path: string;
  per_page: number;
  to: number;
  total: number;
}

type UsersResponseLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export type RequestResponseForUsers = {
  data: User[];
  links: UsersResponseLinks,
  meta: UsersResponseMeta;
  unread_count: number;
}

export type headerProps = {
  searchValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  membersCount: number;
}
