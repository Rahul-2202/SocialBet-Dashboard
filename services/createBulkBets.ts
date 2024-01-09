// https://mocki.io/v1/c0e392f7-02c9-4275-afab-a365954debe8

import toast from "react-hot-toast";

// import toast from "react-hot-toast";

export async function createBulkBets(
  title: string,
  bet: number,
  creator_outcome: number
) {
  // Determine the outcome based on the selected option
  const uid = process.env.NEXT_PUBLIC_API_UID;
  const expiry = 24 * 60 * 60; // 24 hours
  const creator_id = "Hsc2lYwj42UpyedpnppvBOfK9nh1";

  // Make a POST request to the API endpoint
  const response = await fetch(
    "https://api-t5otqgiogq-uc.a.run.app/admin/createBulkBets",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: uid,
        title: title,
        bet: bet,
        expiry: expiry,
        currency: "GBP",
        creator_outcome: creator_outcome,
        creator_id: creator_id,
      }),
    }
  );

  const data = await response.json();
  console.log(data);

  if (!data.success) {
    toast.error(data.error);
    throw new Error(data.error);
  } else {
    toast.success("Bet created successfully");
    console.log(title);
  }
}
