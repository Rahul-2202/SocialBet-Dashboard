import { useEffect, useState } from "react";
import { getConflictedBets, getExpiredBets } from "@/services/getBets";
import { DocumentData } from "@firebase/firestore";
import { resolveBet } from "@/services/updateBet";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "@/components/atoms/loader";
import { cancelBet } from "@/services/cancelBet";
import { Tab } from "@/components/atoms/tab";
import { BetTable } from "@/components/molecules/betTable";

export default function Home() {
  const [bets, setBets] = useState<DocumentData[]>([]);

  const [tab, setTab] = useState("conflicted");
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    // Function to fetch bets
    if (tab === "conflicted") {
      const fetchBets = async () => {
        setIsLoading(true);
        const conflictedBets = await getConflictedBets();
        setIsLoading(false);
        setBets(conflictedBets);
      };

      // Fetch bets initially
      fetchBets();

      // Set up interval to fetch bets every one minute
      const intervalId = setInterval(fetchBets, 60 * 1000);

      // Clean up interval on unmount
      return () => clearInterval(intervalId);
    } else if (tab === "expired") {
      const fetchBets = async () => {
        setIsLoading(true);
        const expiredBets = await getExpiredBets();
        setIsLoading(false);
        setBets(expiredBets);
      };

      // Fetch bets initially
      fetchBets();

      // Set up interval to fetch bets every one minute
      const intervalId = setInterval(fetchBets, 60 * 1000);

      // Clean up interval on unmount
      return () => clearInterval(intervalId);
    }
  }, [tab]);
  return (
    <main>
      <div className="flex-shrink-0 flex-wrap pt-4 mx-auto w-3/4 flex-col items-center">
        <div>
          <div className="text-[#F1F1EF] font-bold text-3xl my-6 ">
            Unresolved Bets
          </div>
          <div className="flex items-center gap-8 pt-2 pb-8">
            <Tab activeTab={tab} tabName="conflicted" setTab={setTab} />
            <Tab activeTab={tab} tabName="expired" setTab={setTab} />
          </div>
        </div>
        <div>
          {loading ? (
            <Loader />
          ) : (
            <BetTable bets={bets} setBets={setBets} activeTab={tab} />
          )}
        </div>
      </div>
      <Toaster />
    </main>
  );
}

