export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  height?: number;
  width?: number;
  strokeWidth?: number;
  strokeColor?: string;
}

export interface IMessage {
  _id: string;
  is_seen: boolean;
  is_favorite: boolean;
  from: string;
  from_email: string;
  subject: string;
  content: string;
  receivedAt: string | Date;
  attachments: any[];
}

export interface IBlog {
  // _id: string;
  title: string;
  author: string;
  slug: string;
  description: string;
  keywords: string | null;
  category: string | null;
  // content: { ops: IContent[] };
  content: string | null;
  thumbnail?: string | null;
  language: string | null;
  status: string | null;
  createdAt?: Date | string;
  // published_date: Date | string;
  // created_Date: Date | string;
  // __v: number;
  views: number | null;
}

export interface IContent {
  insert: InsertClass | string;
  attributes?: Attributes;
}

export interface Attributes {
  align?: string;
  color?: string;
  bold?: boolean;
}

export interface InsertClass {
  image: string;
}

export interface Status {
  value: string;
  label: string;
}
