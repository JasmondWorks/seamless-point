import { cookies } from "next/headers";

export function getUserToken() {
  return cookies().get("token")?.value;
}
