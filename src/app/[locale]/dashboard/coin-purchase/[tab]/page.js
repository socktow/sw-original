"use client";

import { useSearchParams, useParams } from "next/navigation";

export default function CoinPurchasePage() {
  const params = useParams(); // { tab: 'charge' hoặc 'usage' }
  const searchParams = useSearchParams();

  const tab = params?.tab || "charge";
  const page = parseInt(searchParams.get("page") || "1", 10);

  return (
    <div>
      <h1>Tab: {tab}</h1>
      <p>Page: {page}</p>
    </div>
  );
}
