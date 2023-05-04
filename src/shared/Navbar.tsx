import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useUserContext } from '@/context/UserContext';
import Link from '@mui/material/Link';
import { useState, MouseEvent, useEffect } from 'react';
import { useScrollTrigger } from '@mui/material';
import { ROUTES } from '@/appConstants';
import { useRouter } from 'next/router';

enum Settings {
  Profile = 'Profile',
  Account = 'Account',
  Dashboard = 'Dashboard',
  Logout = 'Logout'
}

type Page = {
  name: string;
  path: string;
  signOut?: () => void;
};

type Props = {
  children?: React.ReactNode;
  auth?: boolean;
  settings?: string[];
  pages?: Page[];
};

const initPages = [
  {
    name: 'Pricing',
    path: ROUTES.PRICING
  },
  {
    name: 'How it works',
    path: ROUTES.HOW_IT_WORKS
  },
  {
    name: 'Login',
    path: ROUTES.LOGIN
  }
];

const Navbar = ({
  auth = false,
  pages = initPages,
  settings = ['Profile', 'Account', 'Logout']
}: Props): JSX.Element => {
  const { signOut, user } = useUserContext();
  const router = useRouter();
  const display = auth ? 'flex' : 'none';
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (user) {
      pages[2].name = 'Logout';
      pages[2].signOut = signOut;
    }
  }, [user, pages, signOut]);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (path?: any, logOut?: () => void) => {
    setAnchorElNav(null);
    if (path && !signOut) {
      router.push(path);
    }

    if (logOut) {
      signOut();
    }
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
    <>
      <AppBar
        position='fixed'
        sx={{
          backgroundColor: 'transparent',
          backdropFilter: 'blur(5px)'
        }}
      >
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
                onClose={() => handleCloseNavMenu}
                sx={{
                  display: { xs: 'block' }
                }}
              >
                {pages.map(page => (
                  <MenuItem
                    key={page.name}
                    onClick={() => handleCloseNavMenu(page.path, page?.signOut)}
                  >
                    <Typography textAlign='center'>
                      {page?.signOut && user ? 'Logout' : page.name}
                    </Typography>
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
                <Button
                  key={page.name}
                  variant='nav'
                  onClick={() => handleCloseNavMenu(page.path)}
                >
                  {page.name === 'Login' && user ? 'Logout' : page.name}
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
    </>
  );
};

export default Navbar;
