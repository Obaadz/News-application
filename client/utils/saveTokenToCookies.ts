import Cookies from "js-cookie";

export default function (token: string) {
  Cookies.set("token", token, { expires: 2629746 });
}
