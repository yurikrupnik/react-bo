import io from 'socket.io-client';
import { host } from '../../config';

export default io.connect(host, { reconnect: true });
