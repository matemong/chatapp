import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/next";
import { Server as ServerIO } from "Socket.IO";
import { Server as NetServer } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIO){
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socketio",
    });
    res.socket.server.io = io;
  }
  res.end();
};