import { Loader } from "@/components/atoms/loader";
import { createBulkBets } from "@/services/createBulkBets";
import { CsvData } from "@/types";
import UserContext from "@/utils/UserContext";
import router from "next/router";
import Papa from "papaparse";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const BulkUploadPage: React.FC = () => {
  const [fileContent, setFileContent] = useState<CsvData[] | null>(null);
  const { setLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      setLoggedIn(true);
    } else {
      router.push("/login");
    }
  }, [setLoggedIn]);

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     if (file.type !== "text/csv") {
  //       toast.error("Uploaded file is not a CSV.");
  //     }

  //     Papa.parse(file, {
  //       header: true,
  //       complete: async function (results) {
  //         const data = results.data as CsvData[];
  //         console.log("starttedoooo");
  //         data.forEach(async (item) => {
  //           try {
  //             await createBulkBets(
  //               item.title,
  //               Number(item.betamount),
  //               Number(item.selected === "yes" ? 0 : 1)
  //             );
  //             counter++; // increment counter after successful API call
  //           } catch (error) {
  //             console.error("API call failed", error);
  //           }
  //         });
  //         console.log(counter);
  //       },
  //     });
  //   }
  // };

  let counter = 0; // initialize counter
  let data: CsvData[] = []; // initialize data

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "text/csv") {
        toast.error("Uploaded file is not a CSV.");
      }

      Papa.parse(file, {
        header: true,
        complete: function (results) {
          data = results.data as CsvData[];
          console.log("CSV file parsed");
        },
      });
    }
  };
  const missingBets: CsvData[] = [];
  const finalBets: {
    title: string;
    bet_amount: number;
    selected_option: number;
    expiry: number;
  }[] = [];

  const [isLoading, setIsLoading] = useState(false);

  const fake = () => {
    setIsLoading(true);
  };

  const handleButtonClick = async () => {
    console.log("Button clicked");
    setIsLoading(true);
    try {
      for (const item of data) {
        if (
          item.title === "" ||
          item.bet_amount === "" ||
          item.selected_option === "" ||
          (item.selected_option !== "yes" && item.selected_option !== "no")
        ) {
          missingBets.push(item);
          continue;
        }
        finalBets.push({
          "title": item.title,
          "bet_amount": Number(item.bet_amount),
          "selected_option": Number(item.selected_option === "yes" ? 0 : 1),
          "expiry": Number(24 * 60 * 60),
        });
      }
      if (!finalBets.length) {
        toast.error("No bets to upload");
        setIsLoading(false);
        return;
      }
      await createBulkBets(finalBets);
      setIsLoading(false);
    } catch (error) {
      console.error(
        "API call failed at-----> " + counter + " <--------",
        error
      );
      setIsLoading(false);      
    }
    console.log("missing bets" + missingBets);
  };

  // ...

  return (
    <div className=" text-[#F1F1EF] flex-shrink-0 flex-wrap pt-4 mx-auto w-3/4 flex-col items-center">
      <p className=" font-bold text-3xl my-6 ">Bulk Bets Upload</p>
      <div className=" flex flex-row items-center">
        <input
          className="py-20 pr-28 file:bg-[#514f4f] file:px-4 file:py-1.5 file:rounded-xl file:border file:mr-7 file:cursor-pointer file:text-[#F1F1EF] text-[#a597ed] text-lg "
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
        />

        <button
          className="px-4 py-2 border border-blue bg-[#242424] border-[#7053ff] rounded-xl text-lg mr-8"
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Create Bets"}
        </button>
        {isLoading && <Loader />}
      </div>
      <Toaster />
    </div>
  );
};

export default BulkUploadPage;
