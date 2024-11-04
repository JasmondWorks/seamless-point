"use client";

import styles from './Accordion.module.css'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface Item {
  title: string;
  desc: string;
}

type Props = {
  items: Item[];
};

export function AccordionComponent({ items }: Props) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Function to handle when an accordion item is selected
  const handleAccordionChange = (item: string | null) => {
    setSelectedItem(item); // Update selected item
    console.log("Selected accordion item:", item); // You can log or use the selected item
  };

  return (
    <Accordion value={selectedItem} onValueChange={handleAccordionChange}  type="single" collapsible className="w-full space-y-5">
      {items.map((item) => (
        <AccordionItem className={`${styles.accordionItem} space-y-3 bg-white p-5 rounded-md ${selectedItem === item.title ? 'text-white bg-brandSec' : ''}`} key={item.title} value={item.title}>
          <AccordionTrigger className="m-0 p-0 hover:no-underline font-bold text-lg">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="m-0 p-0">{item.desc}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}