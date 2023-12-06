import React from 'react';

export type TileProps = {
  id?: string;
  data: {
    title: string;
    message: string;
  }
  read_at: string | null;
  onIndicatorClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  actionButtonText: string;
  onTileClickCallback?: () => void;
  onActionButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export type BasicTileProps = {
  data: {
    title: string;
    message: string;
  }
  maxMessageLength?: number;
  showIndicator?: boolean;
  onIndicatorClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onActionButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  actionButtonText?: string;
}
