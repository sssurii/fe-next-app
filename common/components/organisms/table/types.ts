import { ReactElement } from "react";
import { User } from "@/app/(protected)/team/users/types";

export type ColumnOrderTypes = 'asc' | 'desc';

export type ColumnItem = {
  key: string;
  value: string | ReactElement;
  isSortable?: boolean;
}

export type RowItem = {
  id: number;
}

type StorybookPersonType = {
  id: number;
  name: string;
  role: string;
  email: string;
  birthday: string;
  title: string;
}

export type TableProps = {
  data: User[] | StorybookPersonType[];
  isLoading: boolean;
  columns: ColumnItem[];
  noResultsText: string | undefined;
  lastElementRef?: (node: HTMLTableRowElement) => void;
  scrollableContainerClass?: string;
}

export type EmptyTableProps = {
  colSpan: number;
  noResultsText?: string;
}

export type HeadersProps = {
  columns: ColumnItem[];
  order?: ColumnOrderTypes;
  onColumnClick?: (key: string) => void;
}

export type BodyProps<T> = {
  rows: T[];
  columns: ColumnItem[];
  noResultsText?: string;
  lastElementRef?: (node: HTMLTableRowElement) => void;
}


