import toast from "react-hot-toast";

export async function resolveBet(betId: string, selectedOption: string) {
  // Determine the outcome based on the selected option

  if (selectedOption === undefined) {
    toast.error("Please select an outcome");
    return;
  }
  if (!betId) {
    toast.error("Please select a bet to resolve");
    return;
  }
  const outcome = selectedOption === "YES" ? 1 : 0;

  // Make a POST request to the API endpoint
  const response = await fetch(
    "https://api-t5otqgiogq-uc.a.run.app/settle/resolve",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + process.env.NEXT_PUBLIC_API_JWT,
        // Add your authorization header here if needed
      },
      body: JSON.stringify({ bet_id: betId, real_outcome: outcome }),
    }
  );

  const data = await response.json();

  if (!data.success) {
    toast.error(data.error);
  } else {
    toast.success("Bet resolved successfully");
  }
}
