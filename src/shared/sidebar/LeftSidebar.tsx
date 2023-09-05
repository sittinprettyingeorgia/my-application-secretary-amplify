import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';

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
  const list = options.map(option => {
    const { title, icon } = option ?? {};
    return (
      <ListItem sx={{ color: 'red' }} key={title} disablePadding>
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
