import React, { useState } from 'react';

export interface ModalState {
  anchorEl?: Element;
  open: boolean;
  handleOpen(evt?: React.MouseEvent<Element>): void;
  handleClose(): void;
}

export interface UseModalStateOptions {
  openByDefault?: boolean;
}

export const useModalState = ({ openByDefault = false }: UseModalStateOptions = {}): ModalState => {
  const [anchorEl, setAnchorEl] = useState<Element>();
  const [open, setOpen] = useState(openByDefault);

  const handleOpen = (evt?: React.MouseEvent<Element>): void => {
    evt && setAnchorEl(evt.currentTarget);
    setOpen(true);
  };

  const handleClose = (): void => {
    setAnchorEl(undefined);
    setOpen(false);
  };

  return { anchorEl, open, handleOpen, handleClose };
};

export default useModalState;
