import { Container, Box, IconButton, Typography, styled } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import StyledLink from './StyledLink';
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
        marginTop: '5rem'
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
              flexDirection: 'row'
            }}
          >
            <StyledLink path='/pricing' message='Pricing' />
            <StyledLink path='/about' message='About Us' />
            <StyledLink path='/terms' message='Terms &amp; Conditions' />
            <StyledLink path='/privacy' message='Privacy Policy' />
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
            variant='h6'
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
