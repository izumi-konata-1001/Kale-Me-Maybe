import { useEffect, useContext, useState } from "react";
import { AuthContext } from "./contexts/AuthProvider";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function Profile() {
  const [displayAvatars, setDisplayAvatars] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { userId, userAvatar, userName, updateUser,darkMode } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    bio: "",
    gender: "",
    birthDate: "",
    city: "",
    avatarPath: "",
  });

  const fetchUserData = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/api/users/` + userId);
    const data = await response.json();
    setUserData(data);
  };

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarClick = (avatarUrl) => {
    setUserData((prevData) => ({
      ...prevData,
      avatarPath: avatarUrl,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(userData);
      const response = await fetch(`${API_BASE_URL}/api/users/updateprofile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data.username);
      console.log(data.useravatar);

      if (response.ok) {
        if (data.username && data.useravatar) {
          updateUser(data.username, data.useravatar);
        }
        setSuccessMessage(data.message);
      } else {
        setErrorMessage(data.message || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        error.message || "An error occurred while trying to update profile."
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center m-10">
        <img
          src={userData.avatarPath || "/logo.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full"
          onClick={() => setDisplayAvatars(!displayAvatars)}
        />
        {displayAvatars && (
          <div
            className="grid 
        grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
        border-2 border-green-light mt-5"
          >
            <div
              className="hover:bg-green-light"
              onClick={() => handleAvatarClick("/images/bear.png")}
            >
              <img
                src="/images/bear.png"
                alt="avatarBear"
                className="w-16 h-16 rounded-full m-5"
              ></img>
            </div>
            <div
              className="hover:bg-green-light"
              onClick={() => handleAvatarClick("/images/black-dog.png")}
            >
              <img
                src="/images/black-dog.png"
                alt="avatarBlackDog"
                className="w-16 h-16 rounded-full m-5"
              ></img>
            </div>
            <div
              className="hover:bg-green-light"
              onClick={() => handleAvatarClick("/images/cat.png")}
            >
              <img
                src="/images/cat.png"
                alt="avatarCat"
                className="w-16 h-16 rounded-full m-5"
              ></img>
            </div>
            <div
              className="hover:bg-green-light"
              onClick={() => handleAvatarClick("/images/chicken.png")}
            >
              <img
                src="/images/chicken.png"
                alt="avatarChicken"
                className="w-16 h-16 rounded-full m-5"
              ></img>
            </div>
            <div
              className="hover:bg-green-light"
              onClick={() => handleAvatarClick("/images/dog.png")}
            >
              <img
                src="/images/dog.png"
                alt="avatarDog"
                className="w-16 h-16 rounded-full m-5"
              ></img>
            </div>
            <div
              className="hover:bg-green-light"
              onClick={() => handleAvatarClick("/images/gorilla.png")}
            >
              <img
                src="/images/gorilla.png"
                alt="avatarGorilla"
                className="w-16 h-16 rounded-full m-5"
              ></img>
            </div>
            <div
              className="hover:bg-green-light"
              onClick={() => handleAvatarClick("/images/meerkat.png")}
            >
              <img
                src="/images/meerkat.png"
                alt="avatarMeerkat"
                className="w-16 h-16 rounded-full m-5"
              ></img>
            </div>
            <div
              className="hover:bg-green-light"
              onClick={() => handleAvatarClick("/images/panda.png")}
            >
              <img
                src="/images/panda.png"
                alt="avatarPanda"
                className="w-16 h-16 rounded-full m-5"
              ></img>
            </div>
            <div
              className="hover:bg-green-light"
              onClick={() => handleAvatarClick("/images/rabbit.png")}
            >
              <img
                src="/images/rabbit.png"
                alt="avatarRabbit"
                className="w-16 h-16 rounded-full m-5"
              ></img>
            </div>
            <div
              className="hover:bg-green-light"
              onClick={() => handleAvatarClick("/images/sea-lion.png")}
            >
              <img
                src="/images/sea-lion.png"
                alt="avatarSeaLion"
                className="w-16 h-16 rounded-full m-5"
              ></img>
            </div>
          </div>
        )}
      </div>
      <div className={`max-w-sm w-full mx-auto`}>
        <form onSubmit={handleSubmit}>
          <label className="grid grid-cols-10 items-center mt-3">
            <p className={`col-span-3 ${darkMode ? 'text-white' : ''}`}>Name: </p>
            <input
              type="text"
              name="name"
              placeholder={userData.name}
              className="w-full px-4 py-2 bg-gray-100 border-2 rounded-md col-span-7"
              value={userData.name}
              onChange={handleChange}
            ></input>
          </label>
          <label className="grid grid-cols-10 items-center mt-3">
            <p className={`col-span-3 ${darkMode ? 'text-white' : ''}`}>Gender: </p>
            <select
              name="gender"
              className="w-full px-4 py-2 bg-gray-100 border-2 rounded-md col-span-7"
              value={userData.gender}
              onChange={handleChange}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label className="grid grid-cols-10 items-center mt-3">
            <p className={`col-span-3 ${darkMode ? 'text-white' : ''}`}>Birth Date: </p>
            <input
              type="date"
              name="birthDate"
              placeholder={userData.birthDate}
              className="w-full px-4 py-2 bg-gray-100 border-2 rounded-md col-span-7"
              value={userData.birthDate}
              onChange={handleChange}
              required
            ></input>
          </label>
          <label className="grid grid-cols-10 items-center mt-3">
            <p className={`col-span-3 ${darkMode ? 'text-white' : ''}`}>City: </p>
            <input
              type="text"
              name="city"
              placeholder={userData.city}
              className="w-full px-4 py-2 bg-gray-100 border-2 rounded-md col-span-7"
              value={userData.city}
              onChange={handleChange}
            ></input>
          </label>
          <label className="grid grid-cols-10 items-center mt-3">
            <p className={`col-span-3 ${darkMode ? 'text-white' : ''}`}>Bio: </p>
            <textarea
              type="text"
              name="bio"
              placeholder={userData.bio}
              className="w-full px-4 py-2 bg-gray-100 border-2 rounded-md col-span-7"
              value={userData.bio}
              onChange={handleChange}
            ></textarea>
          </label>
          <div className="mt-12">
            {errorMessage && (
              <p className="text-red-500 text-center self-start w-full px-4">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="text-red-500 text-center self-start w-full px-4">
                {successMessage}
              </p>
            )}
            <label className="grid grid-cols-5 items-center">
              <span className="col-span-1"></span>
              <button
                type="submit"
                className="bg-green-dark text-white px-4 py-3 rounded-md col-span-3 mb-10"
              >
                Save
              </button>
              <span className="col-span-1"></span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
