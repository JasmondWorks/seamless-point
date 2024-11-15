"use client";

import React from "react";
import { useUserAuth } from "../_contexts/UserAuthContext";

export default function Username() {
  const { user } = useUserAuth();

  return <span>{user?.firstName}</span>;
}
