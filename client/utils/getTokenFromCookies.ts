import Cookies from "js-cookie";

export default function () {
  return Cookies.get("token") || "";
}
