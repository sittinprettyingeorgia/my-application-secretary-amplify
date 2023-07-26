/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from 'react';

type Profile = {
  authUser: any;
  setAuthUser: (user: any) => void;
  signOut: () => void;
  socket: WebSocket | null;
  setSocket: (socket: WebSocket | null) => void;
};

const initialProfile: Profile = {
  authUser: undefined,
  setAuthUser: _user => {
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

export const useUserAuthContext = () => {
  const { setSocket, socket, signOut, authUser, setAuthUser } =
    useContext(UserContext);
  return {
    setSocket,
    socket,
    signOut,
    authUser,
    setAuthUser
  };
};
