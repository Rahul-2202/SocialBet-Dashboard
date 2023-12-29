export async function resolveBet(betId: string, selectedOption: string) {
  // Determine the outcome based on the selected option
  const outcome = selectedOption === "YES" ? 1 : 0;

  // Make a POST request to the API endpoint
  const response = await fetch(
    "https://api-t5otqgiogq-uc.a.run.app/settle/resolve",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.NEXT_PUBLIC_API_JWT,
        // Add your authorization header here if needed
      },
      body: JSON.stringify({ betId: betId, real_outcome: outcome }),
    }
  );

  const data = await response.json();

  if (!data.success) {
    throw new Error(`${data.error}`);
  }
}
