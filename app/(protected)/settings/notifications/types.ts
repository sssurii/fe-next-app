import React from 'react';

export type NotificationItem = {
  id: string;
  data: {
    title: string;
    message: string;
  }
  read_at: string | null;
  created_at: string;
  type: string;
}

export type NotificationType = {
  [key: string]: string;
};

export enum NotificationStatusTypesEnum {
  read = 'read',
  unread = 'unread',
  all = '',
}

export type NotificationStatusTypes = 'read' | 'unread' | '';

export type NotificationCallbacks = {
  [key: string]: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

type NotificationsResponseLink = {
  url: string | null;
  label: string;
  active: boolean;
}

type NotificationsResponseMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: NotificationsResponseLink,
  path: string;
  per_page: number;
  to: number;
  total: number;
}

type NotificationsResponseLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export type RequestResponseForNotifications = {
  data: NotificationItem[];
  links: NotificationsResponseLinks,
  meta: NotificationsResponseMeta;
  unread_count: number;
}

export type PatchRequestResponseForNotifications = {
  data: {
    ids: string[];
  }
  message: string;
}
