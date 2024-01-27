import { DocumentData } from "@firebase/firestore";
import { Loader } from "@/components/atoms/loader";
import { useState } from "react";
import { resolveBet } from "@/services/updateBet";
import toast from "react-hot-toast";
import { getConflictedBets, getExpiredBets } from "@/services/getBets";
import { cancelBet } from "@/services/cancelBet";
import { OptionValues } from "@/types";

interface BetTableProps {
  bets: DocumentData[];
  activeTab: string;
  setBets: (bets: DocumentData[]) => void;
}

export function BetTable({ bets, activeTab: tab, setBets }: BetTableProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [resolvingBetId, setResolvingBetId] = useState<string | null>(null);
  const [cancelingBetId, setCancelingBetId] = useState<string | null>(null);

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
  const handleOptionChange = (index: number, value: string) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  return (
    <div className="flex-shrink-0 flex-grow-0 flex-wrap pt-4 w-3/4 flex flex-col justify-center items-start gap-6">
      {bets.length > 0 ? (
        bets.map((bet, index) => (
          <div
            className="flex items-start gap-5 w-3/4 flex-grow flex-shrink"
            key={bet.id}
          >
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
                      value={OptionValues.YES}
                      checked={selectedOptions[index] === OptionValues.YES}
                      onChange={() =>
                        handleOptionChange(index, OptionValues.YES)
                      }
                    />
                    <div className="Now Display'] text-[#f1f1ef] font-['Helvetica text-xl font-bold leading-[normal]">
                      {OptionValues.YES}
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <input
                      type="radio"
                      value={OptionValues.NO}
                      checked={selectedOptions[index] === OptionValues.NO}
                      onChange={() =>
                        handleOptionChange(index, OptionValues.NO)
                      }
                    />
                    <div className="Now Display'] text-[#f1f1ef] font-['Helvetica text-xl font-bold leading-[normal]">
                      {OptionValues.NO}
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
                      <Loader size="h-5 w-5 mx-5" color=" border-white" />
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
                      <Loader size="h-5 w-5 mx-5" color=" border-white" />
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
  );
}
