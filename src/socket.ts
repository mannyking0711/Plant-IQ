import { useSocketStoreWithOut } from '@/stores/socket';

export const openSocket = (): void => {
  const ws = new WebSocket('ws://geenieai.com:8089');

  const socketStore = useSocketStoreWithOut();

  ws.onopen = (event: any) => {
    socketStore.SOCKET_ONOPEN(event);
  };

  ws.onmessage = (event: any) => {
    socketStore.SOCKET_ONMESSAGE(event);
  };

  ws.onerror = (event: any) => {
    socketStore.SOCKET_ONERROR(event);
  };

  ws.onclose = (event: any) => {
    socketStore.SOCKET_ONCLOSE(event);
  };
};
