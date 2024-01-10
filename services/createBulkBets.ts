import toast from "react-hot-toast";

export async function createBulkBets(
  bets: {
    title: string;
    bet_amount: number;
    selected_option: number;
    expiry: number;
  }[]
) {
  // Determine the outcome based on the selected option
  const uid = process.env.NEXT_PUBLIC_API_UID;
  // 24 hours
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
        bets: bets,
        currency: "GBP",
        creator_id: creator_id,
      }),
    }
  );

  const data = await response.json();

  if (!data.success) {
    toast.error(data.error);
    throw new Error(data.error);
  } else {
    toast.success("Bet created successfully");
  }
}
