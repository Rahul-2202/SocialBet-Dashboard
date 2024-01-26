import toast from "react-hot-toast";

export async function cancelBet(betId: string) {
  // Determine the outcome based on the selected option

  if (!betId) {
    toast.error("Please select a bet to resolve");
    return;
  }
  // const outcome = selectedOption === "YES" ? 0 : 1;
  // const uid = process.env.NEXT_PUBLIC_API_UID;

  // Make a POST request to the API endpoint
  const response = await fetch(
    "https://api-t5otqgiogq-uc.a.run.app/admin/cancelBet",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bet_id: betId,
      }),
    }
  );

  const data = await response.json();

  if (!data.success) {
    toast.error(data.error);
  } else {
    toast.success(data.response.message);
  }
}
