const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function ThirdPartyLink() {
  const handleGoogleLoginClick = async () => {
    try {
      // Request the Google Auth URL from your backend
      const response = await fetch(`${API_BASE_URL}/api/auth/google/url`);
      const data = await response.json();
      // Redirect the user to the Google Auth URL
      window.location.href = data.url;
    } catch (error) {
      console.error("Failed to get Google auth URL", error);
    }
  };

  return (
    <div className="grid grid-cols-1">
      <button className="grid grid-cols-9 items-center rounded-lg 
      border-green-light border-2 my-2
      hover:bg-green-dark
      hover:text-white"
      onClick={handleGoogleLoginClick}>
        <div className="col-span-6 text-right">Continue with</div>
        <img
          src="/google.png"
          alt="Login with Google"
          className="py-2 px-4 col-span-2"
        ></img>
      </button>
    </div>
  );
}
