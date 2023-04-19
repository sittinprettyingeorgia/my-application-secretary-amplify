import {
  Container,
  Box,
  IconButton,
  Typography,
  styled,
  Link
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { palette } from '@/theme/theme';

const FooterContainer = styled('footer')({
  backgroundColor: palette.secondary.dark
});

const FooterNav = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
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
              fontSize: '1.2rem',
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
          </FooterNav>
          <Box mb={3}>
            <SocialIconButton aria-label='Facebook'>
              <FacebookIcon />
            </SocialIconButton>
            <SocialIconButton aria-label='Instagram'>
              <InstagramIcon />
            </SocialIconButton>
            <SocialIconButton aria-label='LinkedIn'>
              <LinkedInIcon />
            </SocialIconButton>
          </Box>
          <Typography
            color={palette.primary.main}
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
