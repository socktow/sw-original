const channel = typeof window !== "undefined" ? new BroadcastChannel("cart_channel") : null;

export default channel;