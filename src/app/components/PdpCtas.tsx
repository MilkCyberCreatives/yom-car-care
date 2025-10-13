"use client";

import { event } from "@/lib/gtag";

export default function PdpCtas({
  itemName,
  category,
  waText,
}: {
  itemName: string;
  category: string;
  waText: string;
}) {
  const onWhatsApp = () => {
    event("whatsapp_click", { location: "pdp", item_name: itemName, category });
  };

  const onCall = () => {
    event("call_click", { location: "pdp", item_name: itemName, category });
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <a
        href={`https://wa.me/243848994045?text=${waText}`}
        target="_blank"
        className="btn-primary"
        rel="noopener noreferrer"
        onClick={onWhatsApp}
      >
        WhatsApp Enquiry
      </a>
      <a href="tel:+243848994045" className="btn-ghost" onClick={onCall}>
        Call to Order
      </a>
    </div>
  );
}
