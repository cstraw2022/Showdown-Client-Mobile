import React, { useEffect, useState, createContext } from 'react';

interface WebSocketContextValue {
  socket: WebSocket | null;
  messages: string[];
  addMessage: (message: string) => void;
  latest: string;
}

const WebSocketContext = createContext<WebSocketContextValue>({
  socket: null,
  messages: [],
  addMessage: () => {},
  latest: '',
});

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [latest, setLatest] = useState('');

  useEffect(() => {
    const socket = new WebSocket('wss://sim3.psim.us/showdown/websocket');

    socket.onopen = (event) => {
      console.log('WebSocket connected:', event);
    };

    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
      setLatest(event.data);
      console.log("latest: ", latest)
      console.log("event.data: ", event.data)
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = (event) => {
      console.log('WebSocket closed:', event);
    };

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  const addMessage = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    console.log(message)
  };

  return (
    <WebSocketContext.Provider value={{ socket, messages, addMessage, latest }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketProvider };
