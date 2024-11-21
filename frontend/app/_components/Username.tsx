import React from "react";
import { getUser } from "../_lib/actions";

export default async function Username() {
  const user = await getUser();

  return (
    <span>
      {/* {user?.firstName} */}
      Jasmond
    </span>
  );
}
