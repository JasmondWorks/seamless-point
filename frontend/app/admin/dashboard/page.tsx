import Card from "@/app/_components/Card";
import RecentEntityData from "@/app/_components/RecentEntityData";
import StatsCards from "@/app/_components/StatsCards";
import { ChevronRight, Share } from "lucide-react";
import React from "react";

export const recentCustomers = [
  {
    fullName: "John Doe",
    phoneNumber: "+234 813 456 7890",
    email: "john.doe@example.com",
  },
  {
    fullName: "Jane Smith",
    phoneNumber: "+234 802 345 6789",
    email: "jane.smith@example.com",
  },
  {
    fullName: "Emeka Johnson",
    phoneNumber: "+234 814 234 5678",
    email: "emeka.johnson@example.com",
  },
  {
    fullName: "Aisha Bello",
    phoneNumber: "+234 809 123 4567",
    email: "aisha.bello@example.com",
  },
  {
    fullName: "Chinedu Okafor",
    phoneNumber: "+234 817 654 3210",
    email: "chinedu.okafor@example.com",
  },
  {
    fullName: "Fatima Abdullahi",
    phoneNumber: "+234 812 567 8901",
    email: "fatima.abdullahi@example.com",
  },
  {
    fullName: "Tolu Oladele",
    phoneNumber: "+234 805 678 9012",
    email: "tolu.oladele@example.com",
  },
  {
    fullName: "Uche Nwosu",
    phoneNumber: "+234 818 987 6543",
    email: "uche.nwosu@example.com",
  },
  {
    fullName: "Grace Ibekwe",
    phoneNumber: "+234 810 234 5678",
    email: "grace.ibekwe@example.com",
  },
  {
    fullName: "Ahmed Yusuf",
    phoneNumber: "+234 803 789 0123",
    email: "ahmed.yusuf@example.com",
  },
  {
    fullName: "Ngozi Eze",
    phoneNumber: "+234 806 345 6789",
    email: "ngozi.eze@example.com",
  },
  {
    fullName: "Samuel Alabi",
    phoneNumber: "+234 809 432 1098",
    email: "samuel.alabi@example.com",
  },
  {
    fullName: "Kemi Adesanya",
    phoneNumber: "+234 813 876 5432",
    email: "kemi.adesanya@example.com",
  },
  {
    fullName: "Ibrahim Suleiman",
    phoneNumber: "+234 815 987 6543",
    email: "ibrahim.suleiman@example.com",
  },
  {
    fullName: "Blessing Agbaje",
    phoneNumber: "+234 804 345 6789",
    email: "blessing.agbaje@example.com",
  },
  {
    fullName: "Daniel Afolabi",
    phoneNumber: "+234 811 234 5678",
    email: "daniel.afolabi@example.com",
  },
  {
    fullName: "Rita Obi",
    phoneNumber: "+234 802 567 8901",
    email: "rita.obi@example.com",
  },
  {
    fullName: "Joseph Olayemi",
    phoneNumber: "+234 807 678 9012",
    email: "joseph.olayemi@example.com",
  },
  {
    fullName: "Evelyn Okoro",
    phoneNumber: "+234 816 123 4567",
    email: "evelyn.okoro@example.com",
  },
  {
    fullName: "Mohammed Lawal",
    phoneNumber: "+234 808 789 0123",
    email: "mohammed.lawal@example.com",
  },
];
export const recentShipments = [
  {
    fullName: "John Doe",
    email: "john.doe@example.com",
    senderName: "Jane Smith",
    status: "approved",
  },
  {
    fullName: "Aisha Bello",
    email: "aisha.bello@example.com",
    senderName: "Emeka Johnson",
    status: "pending",
  },
  {
    fullName: "Chinedu Okafor",
    email: "chinedu.okafor@example.com",
    senderName: "Grace Ibekwe",
    status: "rejected",
  },
  {
    fullName: "Fatima Abdullahi",
    email: "fatima.abdullahi@example.com",
    senderName: "Ahmed Yusuf",
    status: "approved",
  },
  {
    fullName: "Tolu Oladele",
    email: "tolu.oladele@example.com",
    senderName: "Samuel Alabi",
    status: "pending",
  },
  {
    fullName: "Uche Nwosu",
    email: "uche.nwosu@example.com",
    senderName: "Ngozi Eze",
    status: "approved",
  },
  {
    fullName: "Kemi Adesanya",
    email: "kemi.adesanya@example.com",
    senderName: "Blessing Agbaje",
    status: "rejected",
  },
  {
    fullName: "Ibrahim Suleiman",
    email: "ibrahim.suleiman@example.com",
    senderName: "Daniel Afolabi",
    status: "approved",
  },
  {
    fullName: "Joseph Olayemi",
    email: "joseph.olayemi@example.com",
    senderName: "Rita Obi",
    status: "pending",
  },
  {
    fullName: "Evelyn Okoro",
    email: "evelyn.okoro@example.com",
    senderName: "Mohammed Lawal",
    status: "approved",
  },
  {
    fullName: "Ahmed Yusuf",
    email: "ahmed.yusuf@example.com",
    senderName: "Kemi Adesanya",
    status: "pending",
  },
  {
    fullName: "Grace Ibekwe",
    email: "grace.ibekwe@example.com",
    senderName: "Fatima Abdullahi",
    status: "rejected",
  },
  {
    fullName: "Emeka Johnson",
    email: "emeka.johnson@example.com",
    senderName: "John Doe",
    status: "approved",
  },
  {
    fullName: "Samuel Alabi",
    email: "samuel.alabi@example.com",
    senderName: "Evelyn Okoro",
    status: "rejected",
  },
  {
    fullName: "Ngozi Eze",
    email: "ngozi.eze@example.com",
    senderName: "Ibrahim Suleiman",
    status: "pending",
  },
  {
    fullName: "Rita Obi",
    email: "rita.obi@example.com",
    senderName: "Joseph Olayemi",
    status: "approved",
  },
  {
    fullName: "Blessing Agbaje",
    email: "blessing.agbaje@example.com",
    senderName: "Chinedu Okafor",
    status: "rejected",
  },
  {
    fullName: "Daniel Afolabi",
    email: "daniel.afolabi@example.com",
    senderName: "Tolu Oladele",
    status: "pending",
  },
  {
    fullName: "Mohammed Lawal",
    email: "mohammed.lawal@example.com",
    senderName: "Ahmed Yusuf",
    status: "approved",
  },
  {
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    senderName: "Aisha Bello",
    status: "pending",
  },
];
export const recentTransactions = [
  {
    fullName: "John Doe",
    email: "john.doe@example.com",
    transactionType: "deposit",
    amount: 5000,
  },
  {
    fullName: "Aisha Bello",
    email: "aisha.bello@example.com",
    transactionType: "withdraw",
    amount: 2000,
  },
  {
    fullName: "Chinedu Okafor",
    email: "chinedu.okafor@example.com",
    transactionType: "deposit",
    amount: 1500,
  },
  {
    fullName: "Fatima Abdullahi",
    email: "fatima.abdullahi@example.com",
    transactionType: "withdraw",
    amount: 800,
  },
  {
    fullName: "Tolu Oladele",
    email: "tolu.oladele@example.com",
    transactionType: "deposit",
    amount: 1200,
  },
  {
    fullName: "Uche Nwosu",
    email: "uche.nwosu@example.com",
    transactionType: "withdraw",
    amount: 700,
  },
  {
    fullName: "Kemi Adesanya",
    email: "kemi.adesanya@example.com",
    transactionType: "deposit",
    amount: 2500,
  },
  {
    fullName: "Ibrahim Suleiman",
    email: "ibrahim.suleiman@example.com",
    transactionType: "withdraw",
    amount: 500,
  },
  {
    fullName: "Joseph Olayemi",
    email: "joseph.olayemi@example.com",
    transactionType: "deposit",
    amount: 3000,
  },
  {
    fullName: "Evelyn Okoro",
    email: "evelyn.okoro@example.com",
    transactionType: "withdraw",
    amount: 1500,
  },
  {
    fullName: "Ahmed Yusuf",
    email: "ahmed.yusuf@example.com",
    transactionType: "deposit",
    amount: 1000,
  },
  {
    fullName: "Grace Ibekwe",
    email: "grace.ibekwe@example.com",
    transactionType: "withdraw",
    amount: 1200,
  },
  {
    fullName: "Emeka Johnson",
    email: "emeka.johnson@example.com",
    transactionType: "deposit",
    amount: 4000,
  },
  {
    fullName: "Samuel Alabi",
    email: "samuel.alabi@example.com",
    transactionType: "withdraw",
    amount: 900,
  },
  {
    fullName: "Ngozi Eze",
    email: "ngozi.eze@example.com",
    transactionType: "deposit",
    amount: 3200,
  },
  {
    fullName: "Rita Obi",
    email: "rita.obi@example.com",
    transactionType: "withdraw",
    amount: 2000,
  },
  {
    fullName: "Blessing Agbaje",
    email: "blessing.agbaje@example.com",
    transactionType: "deposit",
    amount: 1800,
  },
  {
    fullName: "Daniel Afolabi",
    email: "daniel.afolabi@example.com",
    transactionType: "withdraw",
    amount: 1100,
  },
  {
    fullName: "Mohammed Lawal",
    email: "mohammed.lawal@example.com",
    transactionType: "deposit",
    amount: 2200,
  },
  {
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    transactionType: "withdraw",
    amount: 1500,
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col ">
      <h1 className="mb-5">
        <strong>Hey "User" - </strong> Let's get you started for today
      </h1>
      <div className="space-y-5">
        <StatsCards />
        <div className="grid lg:grid-cols-3 gap-5">
          <RecentEntityData
            data={recentCustomers.slice(0, 4)}
            entity="customers"
          />
          <RecentEntityData
            data={recentShipments.slice(0, 4)}
            entity="shipments"
          />
          <RecentEntityData
            data={recentTransactions.slice(0, 4)}
            entity="transactions"
          />
        </div>
        <div>
          <Card className="bg-white space-y-7">
            <div className="flex justify-between items-center leading-4 gap-20 overflow-auto whitespace-nowrap">
              <div className="flex gap-8 items-center">
                <h3 className="font-bold text-lg">Sales Report</h3>
                <div className="flex gap-5 items-center font-bold">
                  <div className="border border-neutral-600 p-2 px-3 rounded-lg">
                    12 Months
                  </div>
                  <div className="border border-transparent text-light p-2 px-3 rounded-lg">
                    6 Months
                  </div>
                  <div className="border border-transparent text-light p-2 px-3 rounded-lg">
                    6 Months
                  </div>
                  <div className="border border-transparent text-light p-2 px-3 rounded-lg">
                    6 Months
                  </div>
                </div>
              </div>
              <div className="border border-neutral-600 p-2 px-3 rounded-lg flex items-center">
                <Share size={20} />
                <span>Export PDF</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
