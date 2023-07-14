import { createContext, useContext } from 'react';

type Profile = {
  user: any;
  setUser: (user: any) => void;
  signOut: () => void;
  socket: WebSocket | null;
  setSocket: (socket: WebSocket | null) => void;
};

const initialProfile: Profile = {
  user: undefined,
  setUser: _user => {
    /*empty*/
  },
  signOut: () => {
    /*empty*/
  },
  socket: null,
  setSocket: _socket => {
    /*empty*/
  }
};

export const UserContext = createContext<Profile>(initialProfile);

export const useUserContext = () => {
  const { setSocket, socket, signOut, user, setUser } = useContext(UserContext);
  return {
    setSocket,
    socket,
    signOut,
    user,
    setUser
  };
};
