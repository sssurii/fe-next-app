import { ColumnItem } from "@/common/components/organisms/table/types";

export type UserType = {
  id: number;
  name: string;
  role: string;
  email: string;
  email_verified_at: string;
}

export const mockedUsers: UserType[] = [
  {
    id: 1,
    name: 'Jane Cooper',
    role: 'Admin',
    email: 'jane@yopmail.com',
    email_verified_at: '17 September 2016',
  },
  {
    id: 2,
    name: 'Cody Fisher',
    role: 'Owner',
    email: 'cody@yopmail.com',
    email_verified_at: '17 September 2016',
  },
  {
    id: 3,
    name: 'Esther Howard',
    role: 'Member',
    email: 'esther@yopmail.com',
    email_verified_at: '17 September 2016',
  },
  {
    id: 4,
    name: 'Jenny Wilson',
    role: 'Member',
    email: 'jenny@yopmail.com',
    email_verified_at: '17 September 2016',
  },
  {
    id: 5,
    name: 'Kristin Watson',
    role: 'Admin',
    email: 'watson@yopmail.com',
    email_verified_at: '17 September 2016',
  },
];

export const mockedColumns: ColumnItem[] = [
  {
    key: 'name',
    value: 'Name',
    isSortable: false,
  } ,
  {
    key: 'roles',
    value: 'Roles',
    isSortable: false,
  },
  {
    key: 'email',
    value: 'Email',
    isSortable: false,
  },
  {
    key: 'email_verified_at',
    value: 'Email verified',
    isSortable: false,
  },
];
