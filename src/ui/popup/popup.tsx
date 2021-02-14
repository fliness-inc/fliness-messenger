import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import classes from '@ui/popup/popup.module.scss';

export interface PopupContextProps {
  className?: string;
  children?: JSX.Element | JSX.Element[] | string;
  root: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const PopupContext: React.FC<PopupContextProps> = ({
  children,
  root: { x, y, width, height },
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current?.getBoundingClientRect();
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    const diffX = x + rect.width > maxWidth ? maxWidth - x - rect.width : 0;
    const diffY = y + rect.height > maxHeight ? maxHeight - y - rect.height : 0;

    if (diffX < 0) ref.current.style.left = `${x - rect.width + width}px`;
    else ref.current.style.left = `${x}px`;

    if (diffY < 0) ref.current.style.top = `${y - rect.height + height}px`;
    else ref.current.style.top = `${y}px`;

    ref.current.classList.toggle(classes['popup__context_show']);

    return () => ref.current.classList.toggle(classes['popup__context_show']);
  }, []);

  return (
    <div ref={ref} className={classes['popup__context']}>
      {children}
    </div>
  );
};

export interface PopupBackgroundProps {
  className?: string;
  children?: JSX.Element | JSX.Element[] | string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const PopupBackground: React.FC<PopupBackgroundProps> = ({
  children,
  onClick = () => {},
}) => {
  return (
    <div onClick={onClick} className={classes['popup__background']}>
      {children}
    </div>
  );
};

export interface PopupProps {
  anchor: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  children?: JSX.Element | JSX.Element[] | string;
}

export const Popup: React.FC<PopupProps> = ({
  anchor,
  open: shouldOpen,
  onClose = () => {},
  children,
}: PopupProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      const element = document.createElement('div');
      element.classList.add(classes['popup']);

      ref.current = element;
    }

    setOpen(shouldOpen);
  }, [shouldOpen]);

  useEffect(() => {
    if (!mounted && open) {
      document.body.appendChild(ref.current);
      setMounted(true);

      const rect = anchor.getBoundingClientRect();
      setPos({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    } else if (mounted && !open) {
      document.body.removeChild(ref.current);
      setMounted(false);
    }
  }, [open]);

  const handleBackgroundClick = () => {
    onClose();
    setOpen(false);
  };

  return mounted
    ? ReactDOM.createPortal(
        <>
          <PopupBackground onClick={handleBackgroundClick} />
          <PopupContext root={pos}>{children}</PopupContext>
        </>,
        ref.current
      )
    : null;
};

export default Popup;
