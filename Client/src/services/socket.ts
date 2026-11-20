import { io, type Socket } from "socket.io-client";

const socketUrl = (() => {
  const explicit = import.meta.env.VITE_SOCKET_URL as string | undefined;
  if (explicit) return explicit;
  const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (apiUrl) return apiUrl.replace(/\/api\/?$/, "");
  return "http://localhost:5000";
})();

let socket: Socket | null = null;

export const connectSocket = (token: string): Socket => {
  if (socket?.connected) return socket;

  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socket = io(socketUrl, {
    auth: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
