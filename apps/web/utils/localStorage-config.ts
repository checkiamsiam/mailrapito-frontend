interface Email {
  email: string;
  token: string;
  date: number;
  active: boolean;
  inHistory?: boolean;
}

export const getLSEmails = () => {
  if (typeof window === "undefined") {
    return [];
  } else {
    const found = localStorage.getItem("emails");
    const emails: Email[] = found ? JSON.parse(found) : [];
    // console.log("🚀 ~ getLSEmails ~ emails:", emails);
    return emails;
  }
};

export const persistLSEmails = (email: string, token: string) => {
  const found = getLSEmails();
  const emails = found ? found : [];
  if (typeof window !== "undefined") {
    if (!emails.some((e) => e.email === email)) {
      emails.map((e) => (e.active = false));
      emails.unshift({
        email: email,
        token: token,
        date: new Date().getTime(),
        active: true,
      });
    }
    if (emails.length > 5) {
      emails.pop();
    }
    // localStorage.setItem("emailsHistory", JSON.stringify());
    localStorage.setItem("emails", JSON.stringify(emails));
  }
};

export const getLSEmailsHistory = () => {
  if (typeof window === "undefined") {
    return [];
  } else {
    const found = localStorage.getItem("emailsHistory");
    const emails: Email[] = found ? JSON.parse(found) : [];
    // console.log("🚀 ~ getLSEmails ~ emails:", emails);
    return emails;
  }
};
