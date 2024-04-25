import { useLocation } from "react-router-dom";
import { BackButton } from "../RecipeDetails.jsx";

export default function PageNotFound() {
  const { pathname } = useLocation();

  return (
    <div>
      <div className="relative flex justify-center items-center w-full">
        <BackButton />
        <h1 className={"title"}>Page not found 😭</h1>
      </div>
      <p>
        Unfortunately, we could not find the page you were looking for (
        <code>{pathname}</code>). 🥺 There are some helpful links above to get
        you back on track!
      </p>
    </div>
  );
}
