export default function (cookies: string) {
  const cookiesArray = cookies.split("; ");

  const cookiesObject: { [key: string]: string } = cookiesArray.reduce(
    (prev: any, current) => {
      const [name, ...value] = current.split("=");
      prev[name] = value.join("=");
      return prev;
    },
    {}
  );

  return cookiesObject;
}
