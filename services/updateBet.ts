import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function resolveBet(betId: string, selectedOption: string) {
  const betRef = doc(db, "bets", betId);

  // Determine the outcome based on the selected option
  const outcome = selectedOption === "Yes" ? 1 : 0;

  await updateDoc(betRef, {
    status: "SETTLED",
    real_outcome: outcome,
  });
}
