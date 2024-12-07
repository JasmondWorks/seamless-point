"use client";

import React from "react";
import { getUser } from "../_lib/actions";

export default async function Username({ userType = "user" }) {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return <span>{user?.firstName}</span>;
}
