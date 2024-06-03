import CryptoJS from "crypto-js";
import { openDB } from "idb";

const dbPromise = openDB("entity-babel", 1, {
  upgrade(db) {
    db.createObjectStore("bundlerCache", {
      keyPath: "id",
      autoIncrement: true,
    });
  },
});

const SECRET_KEY = process.env.NEXT_PUBLIC_EMAIL_EXPIRY_DE_ENCRYPT_KEY!;

const encrypt = (data: string): string => {
  return CryptoJS?.AES?.encrypt(data, SECRET_KEY).toString() as string;
};

const decrypt = (data: string): string => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8) as string;
};

export const addRecord = async (record: {
  webpackCache: string;
  shell: string;
}): Promise<number> => {
  const db = await dbPromise;
  const encryptedRecord = {
    webpackCache: encrypt(record.webpackCache),
    shell: encrypt(record.shell),
  };
  const tx = db.transaction("bundlerCache", "readwrite");
  const store = tx.objectStore("bundlerCache");
  const id = await store.add(encryptedRecord);
  await tx.done;
  return id as number;
};

export const getRecords = async (): Promise<
  { id: number; webpackCache: string; shell: string }[]
> => {
  const db = await dbPromise;
  const tx = db.transaction("bundlerCache", "readonly");
  const store = tx.objectStore("bundlerCache");
  const encryptedRecords = await store.getAll();
  await tx.done;

  return encryptedRecords.map((record) => ({
    id: record.id,
    webpackCache: decrypt(record.webpackCache),
    shell: decrypt(record.shell),
  })) as { id: number; webpackCache: string; shell: string }[];
};

export const deleteRecord = async (id: number): Promise<void> => {
  const db = await dbPromise;
  const tx = db.transaction("bundlerCache", "readwrite");
  const store = tx.objectStore("bundlerCache");
  await store.delete(id);
  await tx.done;
};
