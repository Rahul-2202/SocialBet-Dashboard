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

  const handleButtonClick = async () => {
    console.log("Button clicked");
    for (const item of data) {
      try {
        if (
          item.title === "" ||
          item.bet_amount === "" ||
          item.selected_option === "" ||
          (item.selected_option !== "yes" && item.selected_option !== "no")
        ) {
          missingBets.push(item);
          continue;
        }
        await createBulkBets(
          item.title,
          Number(item.bet_amount),
          Number(item.selected_option === "yes" ? 0 : 1)
        );
        counter++; // increment counter after successful API call
      } catch (error) {
        console.error(
          "API call failed at-----> " + counter + " <--------",
          error
        );
        break; // break the loop
      }
    }
    console.log(counter);
    console.log("missing bets" + missingBets);
  };

  // ...

  return (
    <div className="flex flex-col justify-center items-center text-white">
      <h1 className="text-3xl text-white p-10">Bulk Upload Page</h1>
      <input
        className="pb-10 px-5 ml-20 "
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
      <button
        className="p-3 border border-blue bg-[#242424] border-[#7053ff] rounded-xl"
        onClick={handleButtonClick}
      >
        Create Bets
      </button>

      {/* <pre>{fileContent}</pre> */}
      <Toaster />
    </div>
  );
};

export default BulkUploadPage;
