import express from "express";
import { createServer } from "http";
import { Server, Socket} from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5000',
    methods: ['POST', 'GET']
  }
});

const PORT = process.env.PORT || 4000

type SocketParams = 'showtime'
type SocketQuery = Record<SocketParams, string>
type SocketReq = {
  _query: SocketQuery
} & Socket['request']

io.on("connection", (socket) => {
  const params = (socket.request as SocketReq)._query
  const showConnection = params.showtime

  console.log(`${showConnection ? 'Show' : ''} user connected`);
  console.dir(params)

  socket.on("disconnect", () => {
    console.log(`user disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`listening on :${PORT}`);
});
