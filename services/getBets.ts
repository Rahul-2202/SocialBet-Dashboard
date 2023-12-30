import { db } from "@/utils/firebase";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export async function getConflictedBets() {
  const betsRef = collection(db, "bets");
  const q = query(betsRef, where("status", "==", "CONFLICT"));
  const querySnapshot = await getDocs(q);
  const bets: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    bets.push(doc.data());
  });
  return bets;
}

export async function getExpiredBets() {
  const betsRef = collection(db, "bets");
  const q = query(betsRef, where("status", "==", "MATCHED"));
  const querySnapshot = await getDocs(q);
  const bets: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    const bet = doc.data();
    if (new Date(bet.expiry).getTime() <= Date.now()) {
      bets.push(bet);
    }
  });
  return bets;
}

export async function getUsers() {
  const usersRef = collection(db, "users");
  const q = query(usersRef); // No where clause if you want all users
  const querySnapshot = await getDocs(q);
  const users: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
}

// import Papa from "papaparse";
// import { saveAs } from "file-saver";

// export async function generateUserList() {
//   // Fetch the user data
//   const users = await getUsers();

//   // Convert the user data to CSV format
//   const csv = Papa.unparse(users);

//   // Create a blob from the CSV string
//   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

//   // Use FileSaver to save the blob
//   saveAs(blob, "users.csv");
// }
