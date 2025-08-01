"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/redux/slices/userSlice";

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
      if (event.data?.type === "update-user" && event.data?.user) {
        dispatch(setUser(event.data.user));
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
