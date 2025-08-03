"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateUser } from "@/redux/slices/userSlice";

export default function UserInfo() {
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const [channel] = useState(() => new BroadcastChannel("user-updates"));

  useEffect(() => {
    channel.onmessage = (event) => {
      const { type, user: newUser } = event.data || {};
      if (type === "update-user" && newUser) {
        dispatch(updateUser(newUser));
        console.log("[BroadcastChannel] Updated user received:", newUser);
      }
    };

    return () => {
      channel.close();
    };
  }, [dispatch, channel]);

  if (loading) return <div>Loading user data...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="p-6 max-w-md mx-auto space-y-4 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-800">User Information</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Current SW Coin:</strong> {user.swcoin}</p>
    </div>
  );
}
