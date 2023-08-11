import useCurrentUser from '@/hooks/useCurrentUser';
import useTitle from '@/hooks/useTitle';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useRouter } from 'next/router';

type Option = {
  title: string;
  icon: JSX.Element;
};

type Props = {
  sidebarLogo?: any;
  sidebarTitle?: string;
  options: Option[];
};

const LeftSidebar = ({ sidebarLogo, sidebarTitle, options }: Props) => {
  const { user, isLoading, isError } = useCurrentUser();
  const router = useRouter();

  const list = options.map(option => {
    const { title, icon } = option ?? {};
    return (
      <ListItem key={title} disablePadding>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <Box sx={{ width: '15%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label='main navigation'>
        {sidebarLogo}
        {sidebarTitle}
        <List>{list}</List>
      </nav>
    </Box>
  );
};

export default LeftSidebar;
