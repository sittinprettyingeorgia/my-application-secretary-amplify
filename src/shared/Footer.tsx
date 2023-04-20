import {
  Container,
  Box,
  IconButton,
  Typography,
  styled,
  Link,
  Tooltip
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { palette } from '@/theme/theme';

const FooterContainer = styled('footer')({
  backgroundColor: palette.secondary.dark
});

const FooterNav = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1rem'
});

const SocialIconButton = styled(IconButton)({
  color: '#444444',
  marginRight: '0.5rem',
  '&:hover': {
    color: '#000000'
  }
});

const Footer = () => {
  return (
    <FooterContainer
      sx={{
        backgroundColor: palette.secondary.dark,
        position: 'absolute',
        bottom: '0',
        width: '100%',
        padding: '0',
        display: 'flex',
        gap: '30px',
        marginTop: '7rem'
      }}
      className='footer'
    >
      <Container maxWidth='xl' disableGutters>
        <Box
          py={6}
          textAlign='center'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'space-between',
            width: '100%',
            padding: '1rem',
            '@media screen and (max-width: 600px)': {
              flexDirection: 'column',
              alignItems: 'center'
            }
          }}
        >
          <FooterNav
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: '30px',
              fontSize: '1.4rem',
              alignItems: 'center',
              flexDirection: 'row'
            }}
          >
            <Link variant='secondary' href='/pricing'>
              Pricing
            </Link>
            <Link variant='secondary' href='/about'>
              About Us
            </Link>
            <Link variant='secondary' href='/terms'>
              Terms &amp; Conditions
            </Link>
            <Link variant='secondary' href='/privacy'>
              Privacy Policy
            </Link>
            <Tooltip title='Follow us on Instagram'>
              <SocialIconButton aria-label='Instagram'>
                <InstagramIcon sx={{ color: palette.primary.main }} />
              </SocialIconButton>
            </Tooltip>
          </FooterNav>
          <Typography
            color='primary'
            sx={{ fontSize: '1rem' }}
            gutterBottom={false}
          >
            © 2022 Blake Software. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
