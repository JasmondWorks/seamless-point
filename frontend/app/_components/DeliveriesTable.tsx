// --downlevelIteration
// --target

"use client";

import * as React from "react";

import { getDeliveriesColumns } from "@/app/_components/table/deliveries";

import Badge from "./Badge";
import Searchbox from "@/app/_components/Searchbox";
import DataTable from "@/app/_components/DataTable";
import { useDeliveriesStore } from "@/app/_stores/deliveriesStore";
import { useQuery } from "@tanstack/react-query";
import { fetchDeliveries } from "@/app/_lib/actions";
import Loader from "@/app/_components/Loader";
import { formatDeliveries, getBadgeStyle } from "@/app/_lib/utils";
import { deliveryStatus } from "@/app/_lib/constants";

export function DeliveriesTable({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) {
  // Data variables
  const { updateDelivery, cancelDelivery } = useDeliveriesStore();
  const {
    data: deliveriesResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["deliveries"],
    queryFn: () => fetchDeliveries(page, limit),
    refetchInterval: 60000, // Refetch every 60 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  // How do I implement pagination that's coming from the backend?

  // console.log(deliveriesResponse);

  // Create relevant variables based on the data
  const mockDeliveries = {
    status: "success",
    data: {
      totalCount: 8,
      status: "success",
      results: 8,
      data: {
        delivery: [
          {
            status: "unconfirmed",
            deliveryStatus: "pending",
            _id: "67630773f6eee700036d448c",
            packageType: "regular",
            firstName: "John",
            lastName: "Doe",
            street: "123 Maple Street",
            aptUnit: "Apt 10B",
            country: "USA",
            state: "California",
            city: "Los Angeles",
            postCode: "90001",
            email: "john.doe@example.com",
            phoneNumber: "+1234567890",
            toFirstname: "Jane",
            toLastname: "Smith",
            toStreet: "456 Oak Avenue",
            toAptUnit: "Suite 5A",
            toCountry: "USA",
            toState: "New York",
            toCity: "New York City",
            toPostCode: "10001",
            toEmail: "jane.smith@example.com",
            toPhoneNumber: "+1098765432",
            packagingType: "box",
            currency: "USD",
            proofOfPurchaseImage: "https://example.com/proof.jpg",
            packageImage: "https://example.com/package.jpg",
            parcelItems: [
              {
                _id: "67630773f6eee700036d448d",
                name: "Legal Document Pack",
                weight: 0.5,
                quantity: 1,
                type: "document",
                description: "Contains property agreements and contracts",
              },
              {
                _id: "67630773f6eee700036d448e",
                name: "Smartphone",
                weight: 0.8,
                quantity: 2,
                type: "item",
                category: "electronics",
                subCategory: "phones",
                hsCode: "851712",
                value: 1200,
              },
              {
                _id: "67630773f6eee700036d448f",
                name: "Winter Jacket",
                weight: 2,
                quantity: 1,
                type: "item",
                category: "clothing",
                subCategory: "jackets",
                hsCode: "620113",
                value: 250,
              },
            ],
            courier: "dhl",
            user: "67409039983b9500032625d4",
            trackingId: "TMD3MWCF",
            createdAt: "2024-12-18T17:33:39.577Z",
            updatedAt: "2024-12-18T17:33:39.577Z",
          },
          {
            status: "unconfirmed",
            deliveryStatus: "pending",
            _id: "67630792f6eee700036d4492",
            packageType: "regular",
            firstName: "John",
            lastName: "Doe",
            street: "123 Maple Street",
            aptUnit: "Apt 10B",
            country: "USA",
            state: "California",
            city: "Los Angeles",
            postCode: "90001",
            email: "john.doe@example.com",
            phoneNumber: "+1234567890",
            toFirstname: "Jane",
            toLastname: "Smith",
            toStreet: "456 Oak Avenue",
            toAptUnit: "Suite 5A",
            toCountry: "USA",
            toState: "New York",
            toCity: "New York City",
            toPostCode: "10001",
            toEmail: "jane.smith@example.com",
            toPhoneNumber: "+1098765432",
            packagingType: "box",
            currency: "USD",
            proofOfPurchaseImage: "https://example.com/proof.jpg",
            packageImage: "https://example.com/package.jpg",
            parcelItems: [
              {
                _id: "67630792f6eee700036d4493",
                name: "Legal Document Pack",
                weight: 0.5,
                quantity: 1,
                type: "document",
                description: "Contains property agreements and contracts",
              },
              {
                _id: "67630792f6eee700036d4494",
                name: "Smartphone",
                weight: 0.8,
                quantity: 2,
                type: "item",
                category: "electronics",
                subCategory: "phones",
                hsCode: "851712",
                value: 1200,
              },
              {
                _id: "67630792f6eee700036d4495",
                name: "Winter Jacket",
                weight: 2,
                quantity: 1,
                type: "item",
                category: "clothing",
                subCategory: "jackets",
                hsCode: "620113",
                value: 250,
              },
            ],
            courier: "dhl",
            user: "67409039983b9500032625d4",
            trackingId: "56S4QSXV",
            createdAt: "2024-12-18T17:34:10.208Z",
            updatedAt: "2024-12-18T17:34:10.208Z",
          },
          {
            status: "unconfirmed",
            deliveryStatus: "pending",
            _id: "676307bff6eee700036d4498",
            packageType: "regular",
            firstName: "John",
            lastName: "Doe",
            street: "123 Maple Street",
            aptUnit: "Apt 10B",
            country: "USA",
            state: "California",
            city: "Los Angeles",
            postCode: "90001",
            email: "john.doe@example.com",
            phoneNumber: "+1234567890",
            toFirstname: "Jane",
            toLastname: "Smith",
            toStreet: "456 Oak Avenue",
            toAptUnit: "Suite 5A",
            toCountry: "USA",
            toState: "New York",
            toCity: "New York City",
            toPostCode: "10001",
            toEmail: "jane.smith@example.com",
            toPhoneNumber: "+1098765432",
            packagingType: "box",
            currency: "USD",
            proofOfPurchaseImage: "https://example.com/proof.jpg",
            packageImage: "https://example.com/package.jpg",
            parcelItems: [
              {
                _id: "676307bff6eee700036d4499",
                name: "Legal Document Pack",
                weight: 0.5,
                quantity: 1,
                type: "document",
                description: "Contains property agreements and contracts",
              },
              {
                _id: "676307bff6eee700036d449a",
                name: "Smartphone",
                weight: 0.8,
                quantity: 2,
                type: "item",
                category: "electronics",
                subCategory: "phones",
                hsCode: "851712",
                value: 1200,
              },
              {
                _id: "676307bff6eee700036d449b",
                name: "Winter Jacket",
                weight: 2,
                quantity: 1,
                type: "item",
                category: "clothing",
                subCategory: "jackets",
                hsCode: "620113",
                value: 250,
              },
            ],
            courier: "dhl",
            user: "67409039983b9500032625d4",
            trackingId: "H3KTE5K9",
            createdAt: "2024-12-18T17:34:55.036Z",
            updatedAt: "2024-12-18T17:34:55.036Z",
          },
          {
            status: "unconfirmed",
            deliveryStatus: "pending",
            _id: "676307cef6eee700036d449e",
            packageType: "regular",
            firstName: "John",
            lastName: "Doe",
            street: "123 Maple Street",
            aptUnit: "Apt 10B",
            country: "USA",
            state: "California",
            city: "Los Angeles",
            postCode: "90001",
            email: "john.doe@example.com",
            phoneNumber: "+1234567890",
            toFirstname: "Jane",
            toLastname: "Smith",
            toStreet: "456 Oak Avenue",
            toAptUnit: "Suite 5A",
            toCountry: "USA",
            toState: "New York",
            toCity: "New York City",
            toPostCode: "10001",
            toEmail: "jane.smith@example.com",
            toPhoneNumber: "+1098765432",
            packagingType: "box",
            currency: "USD",
            proofOfPurchaseImage: "https://example.com/proof.jpg",
            packageImage: "https://example.com/package.jpg",
            parcelItems: [
              {
                _id: "676307cef6eee700036d449f",
                name: "Legal Document Pack",
                weight: 0.5,
                quantity: 1,
                type: "document",
                description: "Contains property agreements and contracts",
              },
              {
                _id: "676307cef6eee700036d44a0",
                name: "Smartphone",
                weight: 0.8,
                quantity: 2,
                type: "item",
                category: "electronics",
                subCategory: "phones",
                hsCode: "851712",
                value: 1200,
              },
              {
                _id: "676307cef6eee700036d44a1",
                name: "Winter Jacket",
                weight: 2,
                quantity: 1,
                type: "item",
                category: "clothing",
                subCategory: "jackets",
                hsCode: "620113",
                value: 250,
              },
            ],
            courier: "dhl",
            user: "67409039983b9500032625d4",
            trackingId: "JNFJTRZQ",
            createdAt: "2024-12-18T17:35:10.508Z",
            updatedAt: "2024-12-18T17:35:10.508Z",
          },
          {
            status: "unconfirmed",
            deliveryStatus: "pending",
            _id: "67630895f6eee700036d44a4",
            packageType: "regular",
            firstName: "John",
            lastName: "Doe",
            street: "123 Maple Street",
            aptUnit: "Apt 10B",
            country: "USA",
            state: "California",
            city: "Los Angeles",
            postCode: "90001",
            email: "john.doe@example.com",
            phoneNumber: "+1234567890",
            toFirstname: "Jane",
            toLastname: "Smith",
            toStreet: "456 Oak Avenue",
            toAptUnit: "Suite 5A",
            toCountry: "USA",
            toState: "New York",
            toCity: "New York City",
            toPostCode: "10001",
            toEmail: "jane.smith@example.com",
            toPhoneNumber: "+1098765432",
            packagingType: "box",
            currency: "USD",
            proofOfPurchaseImage: "https://example.com/proof.jpg",
            packageImage: "https://example.com/package.jpg",
            parcelItems: [
              {
                _id: "67630895f6eee700036d44a5",
                name: "Legal Document Pack",
                weight: 0.5,
                quantity: 1,
                type: "document",
                description: "Contains property agreements and contracts",
              },
              {
                _id: "67630895f6eee700036d44a6",
                name: "Smartphone",
                weight: 0.8,
                quantity: 2,
                type: "item",
                category: "electronics",
                subCategory: "phones",
                hsCode: "851712",
                value: 1200,
              },
              {
                _id: "67630895f6eee700036d44a7",
                name: "Winter Jacket",
                weight: 2,
                quantity: 1,
                type: "item",
                category: "clothing",
                subCategory: "jackets",
                hsCode: "620113",
                value: 250,
              },
            ],
            courier: "dhl",
            user: "67409039983b9500032625d4",
            trackingId: "83X9PEYX",
            createdAt: "2024-12-18T17:38:29.437Z",
            updatedAt: "2024-12-18T17:38:29.437Z",
          },
          {
            status: "unconfirmed",
            deliveryStatus: "pending",
            _id: "67630a81a5d7443a94d732db",
            packageType: "regular",
            firstName: "John",
            lastName: "Doe",
            street: "123 Maple Street",
            aptUnit: "Apt 10B",
            country: "USA",
            state: "California",
            city: "Los Angeles",
            postCode: "90001",
            email: "john.doe@example.com",
            phoneNumber: "+1234567890",
            toFirstname: "Jane",
            toLastname: "Smith",
            toStreet: "456 Oak Avenue",
            toAptUnit: "Suite 5A",
            toCountry: "USA",
            toState: "New York",
            toCity: "New York City",
            toPostCode: "10001",
            toEmail: "jane.smith@example.com",
            toPhoneNumber: "+1098765432",
            packagingType: "box",
            currency: "USD",
            proofOfPurchaseImage: "https://example.com/proof.jpg",
            packageImage: "https://example.com/package.jpg",
            parcelItems: [
              {
                _id: "67630a81a5d7443a94d732dc",
                name: "Legal Document Pack",
                weight: 0.5,
                quantity: 1,
                type: "document",
                description: "Contains property agreements and contracts",
              },
              {
                _id: "67630a81a5d7443a94d732dd",
                name: "Smartphone",
                weight: 0.8,
                quantity: 2,
                type: "item",
                category: "electronics",
                subCategory: "phones",
                hsCode: "851712",
                value: 1200,
              },
              {
                _id: "67630a81a5d7443a94d732de",
                name: "Winter Jacket",
                weight: 2,
                quantity: 1,
                type: "item",
                category: "clothing",
                subCategory: "jackets",
                hsCode: "620113",
                value: 250,
              },
            ],
            courier: "dhl",
            user: "67409039983b9500032625d4",
            trackingId: "B24NSZ5F",
            createdAt: "2024-12-18T17:46:41.463Z",
            updatedAt: "2024-12-18T17:46:41.463Z",
          },
          {
            status: "unconfirmed",
            deliveryStatus: "pending",
            _id: "676358b888920f5abc2df93e",
            packageType: "regular",
            firstName: "John",
            lastName: "Doe",
            street: "123 Maple Street",
            aptUnit: "Apt 10B",
            country: "USA",
            state: "California",
            city: "Los Angeles",
            postCode: "90001",
            email: "john.doe@example.com",
            phoneNumber: "+1234567890",
            toFirstname: "Jane",
            toLastname: "Smith",
            toStreet: "456 Oak Avenue",
            toAptUnit: "Suite 5A",
            toCountry: "USA",
            toState: "New York",
            toCity: "New York City",
            toPostCode: "10001",
            toEmail: "jane.smith@example.com",
            toPhoneNumber: "+1098765432",
            packagingType: "box",
            currency: "USD",
            proofOfPurchaseImage: "https://example.com/proof.jpg",
            packageImage: "https://example.com/package.jpg",
            parcelItems: [
              {
                _id: "676358b888920f5abc2df93f",
                name: "Legal Document Pack",
                weight: 0.5,
                quantity: 1,
                type: "document",
                description: "Contains property agreements and contracts",
              },
              {
                _id: "676358b888920f5abc2df940",
                name: "Smartphone",
                weight: 0.8,
                quantity: 2,
                type: "item",
                category: "electronics",
                subCategory: "phones",
                hsCode: "851712",
                value: 1200,
              },
              {
                _id: "676358b888920f5abc2df941",
                name: "Winter Jacket",
                weight: 2,
                quantity: 1,
                type: "item",
                category: "clothing",
                subCategory: "jackets",
                hsCode: "620113",
                value: 250,
              },
            ],
            courier: "dhl",
            user: "67409039983b9500032625d4",
            trackingId: "XNXN0498",
            createdAt: "2024-12-18T23:20:24.347Z",
            updatedAt: "2024-12-18T23:20:24.347Z",
          },
          {
            status: "unconfirmed",
            deliveryStatus: "pending",
            _id: "676358d6127f414b84acb342",
            packageType: "regular",
            firstName: "John",
            lastName: "Doe",
            street: "123 Maple Street",
            aptUnit: "Apt 10B",
            country: "USA",
            state: "California",
            city: "Los Angeles",
            postCode: "90001",
            email: "john.doe@example.com",
            phoneNumber: "+1234567890",
            toFirstname: "Jane",
            toLastname: "Smith",
            toStreet: "456 Oak Avenue",
            toAptUnit: "Suite 5A",
            toCountry: "USA",
            toState: "New York",
            toCity: "New York City",
            toPostCode: "10001",
            toEmail: "jane.smith@example.com",
            toPhoneNumber: "+1098765432",
            packagingType: "box",
            currency: "USD",
            proofOfPurchaseImage: "https://example.com/proof.jpg",
            packageImage: "https://example.com/package.jpg",
            parcelItems: [
              {
                _id: "676358d6127f414b84acb343",
                name: "Legal Document Pack",
                weight: 0.5,
                quantity: 1,
                type: "document",
                description: "Contains property agreements and contracts",
              },
              {
                _id: "676358d6127f414b84acb344",
                name: "Smartphone",
                weight: 0.8,
                quantity: 2,
                type: "item",
                category: "electronics",
                subCategory: "phones",
                hsCode: "851712",
                value: 1200,
              },
              {
                _id: "676358d6127f414b84acb345",
                name: "Winter Jacket",
                weight: 2,
                quantity: 1,
                type: "item",
                category: "clothing",
                subCategory: "jackets",
                hsCode: "620113",
                value: 250,
              },
            ],
            courier: "dhl",
            user: "67409039983b9500032625d4",
            trackingId: "GKWDD09A",
            createdAt: "2024-12-18T23:20:54.937Z",
            updatedAt: "2024-12-18T23:20:54.937Z",
          },
        ],
      },
    },
  };
  // Create relevant variables based on the data
  const deliveries = formatDeliveries(deliveriesResponse?.data.data.delivery);
  const totalCount = deliveriesResponse?.data.totalCount;
  const results = deliveriesResponse?.data.results;
  const numberOfPages = Math.ceil(totalCount / results);

  console.log(deliveries);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  // Table layout variables
  const deliveryActions = {
    handleCancelDelivery,
    handleUpdateDelivery,
  };

  const deliveriesColumns = getDeliveriesColumns(deliveryActions);

  const tags = deliveries && [...new Set(deliveries?.map((d) => d?.status))];

  // Handlers
  function handleCancelDelivery(trackingNumber: string) {
    cancelDelivery(trackingNumber);
  }
  function handleUpdateDelivery(trackingNumber: string, status: string) {
    updateDelivery(trackingNumber, { status });
  }
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function toggleTag(tag: string) {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  }

  if (isLoading)
    return (
      <div className="grid place-items-center py-10">
        <Loader />
      </div>
    );
  if (isError) return <div>Error fetching deliveries</div>;

  return (
    <div className="w-full space-y-5">
      <div className="flex flex-col lg:flex-row gap-20 gap-y-5 justify-between">
        <Searchbox
          placeholder="Search"
          onChange={handleSearch}
          value={searchQuery}
        />
        <div className="flex items-center gap-4 flex-wrap">
          {tags.map((tag) => (
            <button key={tag} onClick={() => toggleTag(tag)}>
              <Badge
                className={`${selectedTags.includes(tag) ? "opacity-50" : ""}`}
                key={tag}
                variant={getBadgeStyle(tag)}
              >
                {tag[0].toUpperCase() + tag.slice(1)}{" "}
                {selectedTags.includes(tag) && "x"}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <DataTable
        columns={deliveriesColumns}
        data={deliveries}
        searchQuery={searchQuery}
        selectedTags={selectedTags}
      />
    </div>
  );
}
