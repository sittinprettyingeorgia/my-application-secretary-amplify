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
import Link from '@mui/material/Link';
import { useState, MouseEvent } from 'react';
import { AUTH_USER, NO_AUTH_USER, ROUTES } from '@/appConstants';
import { useRouter } from 'next/router';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useUserAuthContext } from '@/context/UserAuthContext';

export type Page = {
  name: string;
  path: string;
  signOut?: () => void;
};

const Navbar = (): JSX.Element => {
  const { user, authUser } = useCurrentUser();
  const { signOut } = useUserAuthContext();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = async (page: Page) => {
    setAnchorElNav(null);

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

  console.log(authUser);
  const pages = user?.username ? AUTH_USER : NO_AUTH_USER;

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
