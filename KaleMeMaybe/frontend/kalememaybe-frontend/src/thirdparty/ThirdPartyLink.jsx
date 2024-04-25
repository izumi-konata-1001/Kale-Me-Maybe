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

  const handleFaceBookLoginClick = async () => {
    try {
      // Redirect the user to the FaceBook Auth URL
      window.location.href = `${API_BASE_URL}/api/auth/facebook`;
    } catch (error) {
      console.error("Failed to get FaceBook auth URL", error);
    }
  };

  const handleTwitterLoginClick = async () => {
    try {
      // Redirect the user to the Twitter Auth URL
      window.location.href = `${API_BASE_URL}/api/auth/x`;
    } catch (error) {
      console.error("Failed to get FaceBook auth URL", error);
    }
  };

  return (
    <div className="grid grid-cols-3">
      <div className="hover:bg-green-light">
        <img
          src="/google.png"
          alt="Login with Google"
          className="py-4 
        px-5 xl:px-6"
          onClick={handleGoogleLoginClick}
        ></img>
      </div>
      <div className="hover:bg-green-light">
        <img
          src="/facebook.png"
          className="py-4 
        px-5 xl:px-6"
          onClick={handleFaceBookLoginClick}
        ></img>
      </div>
      <div className="hover:bg-green-light">
        <img
          src="twitter.png"
          className="py-4 
        px-5 xl:px-6"
          onClick={handleTwitterLoginClick}
        ></img>
      </div>
    </div>
  );
}
