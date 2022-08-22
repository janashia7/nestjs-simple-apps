import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { randomBytes } from 'crypto';
import { Socket, Server } from 'socket.io';
import { DeleteMsg } from './interface/deleteMsg.interface';
import { EditMsg } from './interface/editMsg.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  usersArr = [];

  @WebSocketServer() server: Server;

  handleDisconnect(client: Socket) {
    const index = this.usersArr.indexOf(client.id);
    const deletedRoomMate = this.usersArr.splice(index, 1);

    this.server.emit('disconnected', `${deletedRoomMate[0].from} disconnected`);
  }

  handleConnection(client: Socket) {
    const { from } = client.handshake.headers;

    if (!from) {
      client.emit('error', 'username not provided');
      return;
    }

    this.usersArr.push({ from, id: client.id });
    const members = [];

    for (const member of this.usersArr) {
      members.push(member.from);
    }
    members.length <= 1
      ? this.server.emit('connection', `${members} is connected`)
      : this.server.emit('connection', `${members.join(', ')} are connected`);
  }

  @SubscribeMessage('message')
  async onChat(client: Socket, message: string) {
    const { from } = client.handshake.headers;

    const msgData = {
      from,
      clientId: client.id,
      msgId: randomBytes(10).toString('hex'),
      message,
    };

    this.server.emit('message', msgData);
    console.log(message);
  }

  @SubscribeMessage('edit')
  async onEdit(client: Socket, editMessage: EditMsg) {
    const { from } = client.handshake.headers;

    const editMsg = {
      message: `${from} updated message`,
      msgId: editMessage.msgId,
    };

    this.server.send(editMsg);
    this.server.emit('edit', `${from}: ${editMessage.message}`);
  }

  @SubscribeMessage('delete')
  async onDelete(client: Socket, deleteMessage: DeleteMsg) {
    const { from } = client.handshake.headers;

    const deleteMsg = {
      message: `${from} deleted message`,
      msgId: deleteMessage.msgId,
    };

    this.server.send(deleteMsg);
    this.server.emit('delete', `${from}: ${deleteMessage.message}`);
  }
}
