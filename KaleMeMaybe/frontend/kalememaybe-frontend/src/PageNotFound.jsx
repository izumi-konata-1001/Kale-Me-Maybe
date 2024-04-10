import { useLocation } from "react-router-dom";

export default function PageNotFound() {
  const { pathname } = useLocation();

  return (
    <>
      <h1>Page not found 😭</h1>
      <p>
        Unfortunately, we could not find the page you were looking for (<code>{pathname}</code>). 🥺
        There are some helpful links above to get you back on track!
      </p>
    </>
  );
}
