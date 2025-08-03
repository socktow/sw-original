"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser, updateUser } from "@/redux/slices/userSlice";

export default function InitialUserLoader({ user }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }

    const onLogin = () => location.reload();
    const onLogout = () => dispatch(clearUser());

    window.addEventListener("auth:login", onLogin);
    window.addEventListener("auth:logout", onLogout);

    const bc = new BroadcastChannel("user-updates");

    bc.onmessage = (event) => {
      const { type, user: updatedUser } = event.data || {};
      if (type === "update-user" && updatedUser) {
        dispatch(updateUser(updatedUser));
      }
    };

    return () => {
      window.removeEventListener("auth:login", onLogin);
      window.removeEventListener("auth:logout", onLogout);
      bc.close();
    };
  }, [dispatch, user]);

  return null;
}
