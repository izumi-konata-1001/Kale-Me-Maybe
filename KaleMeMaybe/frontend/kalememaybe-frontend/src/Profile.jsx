import { useEffect, useContext, useState } from "react";
import { AuthContext } from "./contexts/AuthProvider";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function Profile(){

    const [userData, setUserData] = useState({
        name: '',
        bio: '',
        gender: '',
        birthDate: '',
        city: '',
        avatar:''
    });

    const { userId } = useContext(AuthContext);

    const fetchUserData = async (userId) => {
        const response = await fetch(`${API_BASE_URL}/api/users/` + userId);
        const data = await response.json();
        setUserData(data);
        console.log(data);
    };

    useEffect(() => {
        if (userId) {
            fetchUserData(userId);
        }
    },[]);

    return (
    <div>
        <div>
        {/* <img src={userData.avatar || '/logo.png'} alt="Profile" className="w-10 h-10 rounded-full" /> */}
        </div>
        <div>
            <form>
            </form>
        </div>
    </div>
    );
}