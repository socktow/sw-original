// hooks/useCartSync.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { syncCart } from "@/redux/cartSlice";
import channel from "@/lib/broadcast";

const useCartSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!channel) return;

    const handler = (event) => {
      const { type, payload } = event.data;
      if (type === "ADD") {
        dispatch(syncCart(payload));
      }
    };

    channel.addEventListener("message", handler);

    return () => {
      channel.removeEventListener("message", handler);
    };
  }, [dispatch]);
};

export default useCartSync;
