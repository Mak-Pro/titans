import { HTMLAttributeAnchorTarget } from "react";
type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "text" | "outlined" | "filled";
type ButtonType = "button" | "submit" | "reset";

export interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  type?: ButtonType;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  bgColor?: string;
  textColor?: string;
  radius?: number;
}

export type ModalStatusTypes = "register" | "delete";

export interface ModalProps {
  status: ModalStatusTypes;
  show: boolean;
}

export interface BoardProps {
  type?: "alt" | "person";
  avatar?: string;
  icon?: string;
  title?: string;
  reward?: boolean;
  text?: string;
  rate?: {
    position: string | number;
  } | null;
  button?: {
    link: string;
  } | null;
  onClick?: () => void;
  note?: string;
  position?: number;
  mainLink?: string;
}

export interface SlotProps {
  icon?: string;
  text?: string;
  alt?: boolean;
}

export interface ReferralProps {
  avatar?: string;
  percent?: number;
  name: string;
  users: number;
  earn: number;
}

export interface TopControlAreaProps {
  back?: boolean;
  children?: React.ReactNode;
  backHandler?: () => void;
}
