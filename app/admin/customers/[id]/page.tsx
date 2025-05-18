"use client";

import Card from "@/app/_components/Card";
import DataFetchSpinner from "@/app/_components/DataFetchSpinner";
import { DeliveriesTable } from "@/app/_components/DeliveriesTable";
import { PaymentsTable } from "@/app/_components/PaymentsTable";
import Searchbox from "@/app/_components/Searchbox";
import { Button } from "@/app/_components/ui/button";
import useCustomer from "@/app/_hooks/useCustomer";
import { formatCurrency } from "@/app/_lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { IoDocument, IoDocumentOutline } from "react-icons/io5";

const tabs = ["Overview", "Shipments", "Wallet", "Documents"];

export default function Page({ params: { id } }: { params: { id: string } }) {
  console.log(id);
  const { customer: user, isError, isLoading } = useCustomer(id);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  console.log(activeTab);
  console.log(user);

  if (isLoading) return <DataFetchSpinner />;

  return (
    <div className="space-y-5">
      <h1 className="font-bold text-2xl">Customer Details</h1>
      <Card>
        <div className="flex justify-between items-start">
          <div className="flex gap-6">
            <div className="w-[120px] h-[120px]">
              <Image
                src={user.profileImage || "/assets/images/avatar.png"}
                height={300}
                width={300}
                className="rounded-full object-cover w-[100%] h-[100%]"
                alt="profile image"
              />
            </div>
            <div className="space-y-3">
              <h3>
                {user.firstName} {user?.lastName}
              </h3>
              <p>
                {user.email} {user?.phoneNumber}
              </p>
              <div className="flex gap-3">
                <Card>
                  200 <br /> SHIPMENTS
                </Card>
                <Card>
                  {formatCurrency(8389734)} <br /> SHIPMENTS
                </Card>
              </div>
              <div className="flex gap-3">
                <Button className="bg-red-200 font-semibold text-red-700 hover:bg-red-700 hover:text-white focus-visible:bg-red-700 focus-visible:text-white focus-visible:ring-2 focus-visible:ring-red-700 transition-all duration-300">
                  Suspend User
                </Button>
                <Button className="bg-red-200 font-semibold text-red-700 hover:bg-red-700 hover:text-white focus-visible:bg-red-700 focus-visible:text-white focus-visible:ring-2 focus-visible:ring-red-700 transition-all duration-300">
                  Deactivate account
                </Button>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Send Email</Button>
            <Button variant="outline">Send SMS</Button>
          </div>
        </div>
        <div className="flex gap-6 mt-8">
          {tabs.map((tab) => (
            <button
              className={tab === activeTab ? "text-brandPry" : "opacity-70"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      {activeTab !== "Wallet" && (
        <Card>
          {activeTab === "Overview" && <Overview />}
          {activeTab === "Shipments" && <Shipments />}
          {activeTab === "Documents" && <Documents />}
        </Card>
      )}
      {activeTab === "Wallet" && (
        <>
          <Card>
            <WalletStats />
          </Card>
          <Card>
            <WalletTable />
          </Card>
        </>
      )}
    </div>
  );
}

function Overview() {
  return (
    <>
      <h3 className="text-lg font-bold mb-8">Customer overview</h3>
      <div className="space-y-5">
        <p className="grid grid-cols-[300px,auto]">
          <span>Registration date</span>
          <span>Mon March 11th, 2024 - 6:00pm</span>
        </p>
        <p className="grid grid-cols-[300px,auto]">
          <span>Last activity date</span>
          <span>Mon March 11th, 2024 - 6:00pm</span>
        </p>
        <p className="grid grid-cols-[300px,auto]">
          <span>Primary pick up address</span>
          <span>Undefined</span>
        </p>
        <p className="grid grid-cols-[300px,auto]">
          <span>Secondary pick up address</span>
          <span>Undefined</span>
        </p>
      </div>
    </>
  );
}

function Shipments() {
  return <DeliveriesTable page={1} limit={10} sort="asc" />;
}
function WalletStats() {
  return (
    <div className="flex gap-3">
      <Card>
        {formatCurrency(123)} <br /> BALANCE
      </Card>
      <Card>
        {formatCurrency(839389)} <br /> TOTAL FUNDED
      </Card>
      <Card>
        {formatCurrency(234534)} <br /> TOTAL SPENT
      </Card>
    </div>
  );
}
function WalletTable() {
  const [searchQuery, setSearchQuery] = React.useState("");

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  return (
    <>
      <PaymentsTable
        searchQueryExternal={searchQuery}
        header={
          <div className="flex gap-3">
            <Searchbox
              className="md:min-w-[500px] flex-1"
              placeholder="Search for payments"
              onChange={handleSearch}
              value={searchQuery}
            />
            <Button className="bg-orange-200 text-orange-500">
              Top up wallet
            </Button>
            <Button className="bg-orange-200 text-orange-500">
              Debit wallet
            </Button>
          </div>
        }
      />
    </>
  );
}

function Documents() {
  return (
    <>
      <h3 className="text-lg font-bold mb-2">Documents</h3>
      <div className="flex gap-3">
        <Button variant="outline" className="flex-gap-3">
          <IoDocumentOutline /> CAC
        </Button>
        <Button variant="outline" className="flex-gap-3">
          <IoDocumentOutline /> Utility bill
        </Button>
        <Button variant="outline" className="flex-gap-3">
          <IoDocumentOutline /> Identification
        </Button>
      </div>
    </>
  );
}
