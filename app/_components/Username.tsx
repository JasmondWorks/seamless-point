"use client";

import React from "react";
// import { getUser } from "../_lib/actions";
import { getLocalStorageKey } from "@/app/_lib/utils";

export default function Username({ userType = "user" }) {
  const storedUser = localStorage.getItem(getLocalStorageKey("user"));

  const user = storedUser ? JSON.parse(storedUser) : null;

  return <span>{user?.firstName}</span>;
}
