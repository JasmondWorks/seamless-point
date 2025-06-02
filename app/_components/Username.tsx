"use client";

import React from "react";

export default function Username() {
  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  return <span>{user?.firstName}</span>;
}
