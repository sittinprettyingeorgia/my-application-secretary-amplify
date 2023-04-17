import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useUserContext } from '@/context/UserContext';
import Link from '@mui/material/Link';
import { useState, MouseEvent } from 'react';

enum Settings {
  Profile = 'Profile',
  Account = 'Account',
  Dashboard = 'Dashboard',
  Logout = 'Logout'
}

type Props = {
  children?: React.ReactNode;
  auth?: boolean;
  settings?: string[];
  pages?: string[];
};

const Navbar = ({
  auth = false,
  pages = ['Pricing', 'About Us', 'Login'],
  settings = ['Profile', 'Account', 'Logout']
}: Props): JSX.Element => {
  const { user, signOut } = useUserContext();
  const display = auth ? 'flex' : 'none';
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (key: string) => {
    switch (key) {
      case Settings.Logout:
        signOut();
        break;
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position='fixed'>
      <Container sx={{ justifySelf: 'start' }} maxWidth='xl'>
        <Toolbar disableGutters>
          <AdbIcon
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1
            }}
          />
          <Link
            className='logoTitle'
            variant='h2'
            href='/'
            sx={{
              display: { xs: 'none', md: 'flex', lg: 'flex' },
              mr: 10,
              fontWeight: 700
            }}
          >
            My Application Secretary
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' }
            }}
          >
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block' }
              }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Link
            variant='h5'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700
            }}
          >
            My Application Secretary
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              gap: '30px'
            }}
          >
            {pages.map(page => (
              <Button key={page} variant='nav' onClick={handleCloseNavMenu}>
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display }}>
            <Menu
              sx={{ mt: '45px' }} //TODO: add pxToRem function
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem
                  key={setting}
                  sx={{}}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
