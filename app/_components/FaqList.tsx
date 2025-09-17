"use client";

import { AccordionComponent } from "@/app/_components/Accordion";
import Button, { ButtonVariant } from "@/app/_components/Button";
import React, { useState } from "react";

const items = [
  {
    title: "How do I create a shipment?",
    desc: "Learn the simple steps to book your shipments quickly and efficiently on our platform.",
  },
  {
    title: "How do I complete my KYC (Know Your Customer) verification?",
    desc: "Follow our guide to upload your documents and complete your KYC verification for a seamless experience.",
  },
  {
    title:
      "How do I register as a 3PL (Third-Party Logistics Provider) or Merchant?",
    desc: "Join our network of partners by signing up as a 3PL provider or merchant. We’ll walk you through the registration process.",
  },
  {
    title: "How do I track my shipments?",
    desc: "Keep tabs on your packages in real-time with our easy-to-use tracking system.",
  },
  {
    title: "Where are your drop-off locations?",
    desc: "Find our conveniently located drop-off points to ensure a smooth shipping process.",
  },
  {
    title: "How do I upload my KYC documents?",
    desc: "Learn how to securely upload your KYC documents to verify your account.",
  },
  {
    title: "How do I insure my package?",
    desc: "Discover how to add insurance to your shipments for added peace of mind.",
  },
  {
    title: "How do I ship food items?",
    desc: "Get to know our guidelines and requirements for shipping food items safely and legally.",
  },
];

export default function FaqList() {
  const [isViewingFullList, setIsViewingFullList] = useState(false);
  const filteredItems = isViewingFullList ? items : items.slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto">
      <AccordionComponent items={filteredItems} />
      <div className="flex justify-center mt-2">
        <Button
          variant={ButtonVariant.link}
          onClick={() => setIsViewingFullList((cur) => !cur)}
        >
          Show {isViewingFullList ? "less" : "more"}
        </Button>
      </div>
    </div>
  );
}
