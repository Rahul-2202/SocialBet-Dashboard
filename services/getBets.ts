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
