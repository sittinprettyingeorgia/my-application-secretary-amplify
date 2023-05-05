import { noAuthUser } from '@/appConstants';
import { Page } from '@/shared/Navbar';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type Profile = {
  signOut: () => void;
  socket: WebSocket | null;
  setSocket: (socket: WebSocket | null) => void;
  user: any;
  pages?: Page[];
  setPages: Dispatch<SetStateAction<Page[]>>;
};

const initialProfile: Profile = {
  signOut: () => {
    /*empty*/
  },
  socket: null,
  setSocket: socket => {
    /*empty*/
  },
  user: null,
  pages: undefined,
  setPages: () => {
    /*empty*/
  }
};

export const UserContext = createContext<Profile>(initialProfile);

export const useUserContext = () => {
  const { setSocket, socket, signOut, user, pages, setPages } =
    useContext(UserContext);
  return { setSocket, socket, signOut, user, pages, setPages };
};
