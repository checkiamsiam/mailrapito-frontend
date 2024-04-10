import type { IMessage } from "./commonInterface";

export interface IFetchMessages {
  status: "success" | "error";
  data: {
    mailbox: string;
    messages: IMessage[];
  };
}

export interface IEmailToken {
  status: "success" | "error";
  data: {
    delete_in: Date | string;
    email_token: string;
  };
}

export interface IDomains {
  status: "success" | "error";
  data: { domain: string }[];
}
