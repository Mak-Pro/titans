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
  linkClick?: () => void;
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
  type?: "alt" | "person" | "invite";
  avatar?: string | null;
  icon?: string | null;
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
  note?: string | React.ReactNode;
  position?: number;
  mainLink?: string;
  bonus?: number;
  done?: boolean;
  questId?: number;
  callBack?: () => void | undefined;
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

export interface ProgressProps {
  light: number;
  dark: number;
}

export interface CardProps {
  position?: number | string;
  image?: string;
  subtitle?: string;
  title?: string;
  text?: string;
  button?: {
    text: string;
    link?: string;
    onClick?: () => void;
  };
  location: {
    x: number;
    y: number;
  };
  blocked: boolean;
}

export type ForceSide = "PROTECTORS" | "CONQUERORS";

export interface RegisterDataProps {
  username: string;
  telegramId: number | undefined;
  avatar?: string;
  side: ForceSide;
}

export interface TitanProps {
  id: number | null;
  name: string;
  side: ForceSide;
  power: number;
  agility: number;
  stamina: number;
  powerPrice: number;
  staminaPrice: number;
  agilityPrice: number;
  minPower: number;
  maxPower: number;
  minStamina: number;
  maxStamina: number;
  minAgility: number;
  maxAgility: number;
  available: boolean;
}

export interface RewardsProps {
  checkInCounter: number;
  minDay: number;
  maxDay: number;
  todayReward: number;
  weekReward: number;
}

export interface UserInfoProps {
  avatarLink: string | null;
  checkInCounter: number;
  currentTitan: TitanProps;
  dailyReward: RewardsProps | null;
  firstCheckIn: boolean;
  lastCheckIn: string;
  points: number;
  referralCode: string;
  referralPoints: number;
  side: ForceSide;
  telegramId?: number;
  titans: TitanProps[];
  username: string;
}

export interface FriendProps {
  avatarLink: string;
  level: number;
  points: 0;
  telegramId?: string | number;
  username: string;
}

export type GamePhase = "CHARGE" | "FARMING";

export interface GameInfoProps {
  id: number;
  gamePhase: GamePhase;
  points: number;
  clickValue: number;
  farmingTime: number;
  created?: string;
  userPoints: number;
  titan: {
    id: number;
    name: string;
    side: ForceSide;
    power: number;
    stamina: number;
    agility: number;
    available: boolean;
  };
}

export interface CountdownTimerProps {
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  note?: string;
  targetDate: string;
  className?: string;
}

export type RewardType = "MULTIPLICATOR" | "POINTS";

export interface QuestProps {
  button: { link: string } | null;
  description: string;
  done: boolean;
  id: number;
  name: string;
  order: number;
  reward: number;
  rewardType: RewardType;
}

export interface QuestsProps {
  dailyQuests: QuestProps[];
  partnersQuests: QuestProps[];
  socialQuests: QuestProps[];
}

export type TitanAttributes = "POWER" | "AGILITY" | "STAMINA";
