'use client'

import { useAuthContext } from "../../../src/context/AuthContext";

const Profile = () => {
    const { currentUser, logout } = useAuthContext();
  return (
    <div className="flex flex-col">
        <button onClick={() => logout()}>Log out</button>
        <div className="flex flex-col">
            <span>Current user:</span>
            <pre>{JSON.stringify(currentUser)}</pre>
        </div>
    </div>
  )
}

export default Profile