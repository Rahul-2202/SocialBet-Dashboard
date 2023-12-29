import { useEffect, useState } from "react";
import { getConflictedBets, getExpiredBets } from "@/services/getBets";
import { DocumentData } from "@firebase/firestore";
import Logo from "@/public/Logo1.svg";
import profile from "@/public/profileImage.png";
import Image from "next/image";
import { resolveBet } from "@/services/updateBet";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [bets, setBets] = useState<DocumentData[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [tab, setTab] = useState("conflicted");

  const handleOptionChange = (index: number, value: string) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const handleResolve = async (betId: string, selectedOption: string) => {
    // Call the resolveBet function with the betId and selectedOption
    await resolveBet(betId, selectedOption);

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
        const conflictedBets = await getConflictedBets();
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
        const expiredBets = await getExpiredBets();
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
      <div className="flex-shrink-0 w-[full]  h-20 flex flex-wrap justify-between items-center mx-auto p-4 rounded-bl-xl rounded-br-xl bg-[#242424]">
        <div className="flex gap-16 items-center">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src={Logo} alt="Logo" className="h-14 w-12 ml-8" />
          </a>
        </div>
        <div className="inline-flex justify-center items-center gap-3 py-1 pl-1 pr-2 mr-6 rounded-xl border border-[#7053ff]">
          <Image src={profile} alt="Profile" className="h-12 w-12 rounded-lg" />
          <div className="flex flex-col justify-center items-start">
            <div className="text-[#f1f1ef] font-[' font-bold leading-[normal]']">
              Admin Profile
            </div>
            <div className="text-[#b3b3b3] font-[' text-xs font-medium leading-[normal]']">
              Administrator
            </div>
          </div>
        </div>
      </div>
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
                      <button
                        className="flex justify-center cursor-pointer items-center gap-2 p-2 w-[12.8125rem] rounded-lg bg-[#7053ff] text-[#f1f1ef] text-xl font-bold leading-[normal]"
                        onClick={() =>
                          handleResolve(bet.id, selectedOptions[index])
                        }
                      >
                        Resolve
                      </button>
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
        </div>
      </div>
      <Toaster />
    </main>
  );
}

