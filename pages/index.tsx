import { useEffect, useState } from "react";
import { getConflictedBets, getExpiredBets } from "@/services/getBets";
import { DocumentData } from "@firebase/firestore";
import { resolveBet } from "@/services/updateBet";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "@/components/atoms/loader";
import { cancelBet } from "@/services/cancelBet";

export default function Home() {
  const [bets, setBets] = useState<DocumentData[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [tab, setTab] = useState("conflicted");
  const [loading, setIsLoading] = useState(false);
  const [resolvingBetId, setResolvingBetId] = useState<string | null>(null);
  const [cancelingBetId, setCancelingBetId] = useState<string | null>(null);

  const handleOptionChange = (index: number, value: string) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const handleResolve = async (betId: string, selectedOption: string) => {
    if (resolvingBetId) {
      toast.error("Please wait for the previous bet to resolve");
      return;
    }
    // Call the resolveBet function with the betId and selectedOption
    console.log("click resolve");
    setResolvingBetId(betId);
    // ... rest of your code

    await resolveBet(betId, selectedOption);
    // //timeout for 5 seconds
    // setTimeout(() => {
    //   setResolvingBetId(null);
    // }, 5000);

    setResolvingBetId(null);

    if (tab === "conflicted") {
      getConflictedBets().then(setBets);
    } else if (tab === "expired") {
      getExpiredBets().then(setBets);
    }
  };
  const handleCancelBet = async (betId: string) => {
    // Call the resolveBet function with the betId and selectedOption
    if (cancelingBetId) {
      toast.error("Please wait for the previous bet to cancel");
      return;
    }

    console.log("click cancel");
    setCancelingBetId(betId);
    // //timeout for 5 seconds
    // setTimeout(() => {
    //   setCancelingBetId(null);
    // }, 5000);
    await cancelBet(betId);
    setCancelingBetId(null);

    if (tab === "conflicted") {
      getConflictedBets().then(setBets);
    } else if (tab === "expired") {
      getExpiredBets().then(setBets);
    }
  };

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
            <button
              className={`text-lg text-[#f1f1ef] ${
                tab === "conflicted" ? "bg-[#7053ff]" : ""
              } px-4 py-2 rounded-lg border  border-[#7053ff] `}
              onClick={() => setTab("conflicted")}
            >
              Conflicted
            </button>
            <button
              className={`text-lg text-[#f1f1ef] ${
                tab === "expired" ? "bg-[#7053ff]" : ""
              } px-4 py-2 mx-2 rounded-lg border  border-[#7053ff]`}
              onClick={() => setTab("expired")}
            >
              Expired
            </button>
          </div>
        </div>
        <div>
          {loading ? (
            <Loader />
          ) : (
            <div className="flex-shrink-0 flex-grow-0 flex-wrap pt-4 w-3/4 flex flex-col justify-center items-start gap-6">
              {bets.length > 0 ? (
                bets.map((bet, index) => (
                  <div className="flex items-start gap-5 w-3/4 " key={bet.id}>
                    <div className="flex flex-col justify-center items-center p-5 rounded-xl bg-[#242424]">
                      <div className="flex flex-col items-center justify-center w-full sm:w-[28.875rem] h-[7.5rem] text-[#f1f1ef] text-center font-['text-xl font-bold leading-[normal]']">
                        {bet.title}
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 pl-2">
                      <div className="inline-flex items-start gap-3 py-1 px-2 w-[27.813rem] rounded-lg border border-[#b3b3b3]/50">
                        <div className="text-[#b3b3b3] w-[6.313rem] text-lg font-bold leading-[normal]">
                          ID
                        </div>
                        <div className="text-[#f1f1ef] w- text-center text-lg leading-[normal]">
                          {bet.id}
                        </div>
                      </div>
                      <div className="inline-flex items-start gap-3 py-1 px-2 w-[27.813rem] rounded-lg border border-[#b3b3b3]/50">
                        <div className="text-[#b3b3b3] w-[6.313rem] text-lg font-bold leading-[normal]">
                          Creator UID
                        </div>
                        <div className="text-[#f1f1ef] text-center text-lg leading-[normal]">
                          {bet.creator_id}
                        </div>
                      </div>
                      <div className="flex items-start gap-3 py-1 px-2 w-[27.813rem] rounded-lg border border-[#b3b3b3]/50">
                        <div className="flex-shrink-0 w-[6.313rem] text-[#b3b3b3] font-['Helvetica text-lg font-bold leading-[normal]">
                          Created At
                        </div>
                        <div className="text-[#f1f1ef] text-lg leading-[normal]">
                          {bet.created_at.substring(0, 10)}
                        </div>
                      </div>
                      <div className="flex items-start gap-3 py-1 px-2 w-[27.813rem] rounded-lg border border-[#b3b3b3]/50">
                        <div className="flex-shrink-0 w-[6.313rem] text-[#b3b3b3] font-['Helvetica text-lg font-bold leading-[normal]">
                          Ended At
                        </div>
                        <div className="text-[#f1f1ef] text-lg leading-[normal]">
                          {bet.expiry.substring(0, 10)}
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex flex-col items-start">
                      <div className="flex flex-col items-center gap-7 sm:w-[12.8125rem]">
                        <div className="Now Display'] text-[#b3b3b3] font-['Helvetica text-xl font-bold leading-[normal]">
                          Select Outcome
                        </div>
                        <div className="flex items-start gap-7">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              value="YES"
                              checked={selectedOptions[index] === "YES"}
                              onChange={() => handleOptionChange(index, "YES")}
                            />
                            <div className="Now Display'] text-[#f1f1ef] font-['Helvetica text-xl font-bold leading-[normal]">
                              YES
                            </div>
                          </div>
                          <div className="flex justify-center items-center gap-3">
                            <input
                              type="radio"
                              value="NO"
                              checked={selectedOptions[index] === "NO"}
                              onChange={() => handleOptionChange(index, "NO")}
                            />
                            <div className="Now Display'] text-[#f1f1ef] font-['Helvetica text-xl font-bold leading-[normal]">
                              NO
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <button
                            className="flex justify-center cursor-pointer items-center gap-2 px-3 py-2 rounded-lg bg-[#7053ff] text-[#f1f1ef] text-lg font-bold leading-[normal]"
                            onClick={() =>
                              handleResolve(bet.id, selectedOptions[index])
                            }
                            disabled={cancelingBetId === bet.id}
                          >
                            {resolvingBetId === bet.id ? (
                              <Loader
                                size="h-5 w-5 mx-5"
                                color=" border-white"
                              />
                            ) : (
                              "Resolve"
                            )}
                          </button>
                          <button
                            className="flex justify-center cursor-pointer items-center gap-2 px-3.5 py-2 rounded-lg bg-[#f52f2f] text-[#f1f1ef] text-lg font-bold leading-[normal]"
                            onClick={() => handleCancelBet(bet.id)}
                            disabled={resolvingBetId === bet.id}
                          >
                            {cancelingBetId === bet.id ? (
                              <Loader
                                size="h-5 w-5 mx-5"
                                color=" border-white"
                              />
                            ) : (
                              "Cancel"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mx-auto text-xl text-[#f1f1ef]">
                  <h3>There are no {tab} bets</h3>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </main>
  );
}

