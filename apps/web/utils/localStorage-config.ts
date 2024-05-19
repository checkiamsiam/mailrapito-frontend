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
    return emails;
  }
};

// export const activeThisEmailLS = (email: string) => {
//   const emails = getLSEmails();
//   emails.map((e) => (e.active = false));
//   const found = emails.find((e) => e.email === email);
//   if (found) {
//     found.active = true;
//     localStorage.setItem("emails", JSON.stringify(emails));
//   }
// };

export const activeThisEmailInHistoryLS = (email: string) => {
  const emails = getLSEmailsHistory();
  emails.map((e) => (e.active = false));
  const found = emails.find((e) => e.email === email);
  if (found) {
    found.active = true;
    localStorage.setItem("emailsHistory", JSON.stringify(emails));
  } else {
    localStorage.setItem("emailsHistory", JSON.stringify(emails));
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
    return emails;
  }
};

export const getActiveEmail = () => {
  const emails = getLSEmails();
  const found = emails.find((e) => e.active);
  return found;
};
