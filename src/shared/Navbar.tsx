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
import { useState, MouseEvent } from 'react';
<<<<<<< HEAD
import { authUser, noAuthUser, ROUTES } from '@/appConstants';
=======
import { useScrollTrigger } from '@mui/material';
import { ROUTES } from '@/appConstants';
>>>>>>> f33040313b887fb4ed9b0b6cef72de7cb780b572
import { useRouter } from 'next/router';

export type Page = {
  name: string;
  path: string;
};

<<<<<<< HEAD
const Navbar = (): JSX.Element => {
=======
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
>>>>>>> f33040313b887fb4ed9b0b6cef72de7cb780b572
  const { user, signOut } = useUserContext();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
<<<<<<< HEAD

=======
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });
>>>>>>> f33040313b887fb4ed9b0b6cef72de7cb780b572
  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

<<<<<<< HEAD
  const handleCloseNavMenu = async (page: Page) => {
    setAnchorElNav(null);
=======
  const handleCloseNavMenu = (path?: any) => {
    setAnchorElNav(null);
    if (path) {
      router.push(path);
    }
  };
>>>>>>> f33040313b887fb4ed9b0b6cef72de7cb780b572

    switch (page?.name) {
      case 'Logout':
        signOut();
        router.push(ROUTES.LANDING);
        break;
      case 'Login':
        router.push({
          pathname: page.path,
          query: { login: true }
        });
        break;
      default:
        router.push(page.path);
        break;
    }
  };

  const pages = user?.username ? authUser : noAuthUser;

  return (
    <>
      <AppBar
        position='relative'
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
                mr: 10
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
<<<<<<< HEAD
                {pages.map((page: any) => {
                  return (
                    <MenuItem
                      key={page.name}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography textAlign='center'>{page.name}</Typography>
                    </MenuItem>
                  );
                })}
=======
                {pages.map(page => (
                  <MenuItem
                    key={page.name}
                    onClick={() => handleCloseNavMenu(page.path)}
                  >
                    <Typography textAlign='center'>{page.name}</Typography>
                  </MenuItem>
                ))}
>>>>>>> f33040313b887fb4ed9b0b6cef72de7cb780b572
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Link
              variant='h5'
              href='/'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1
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
              {pages.map((page: any) => (
                <Button
                  key={page.name}
                  variant='nav'
                  onClick={() => handleCloseNavMenu(page)}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
