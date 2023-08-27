import { Box } from '@mui/material';

type Props = {
  title: string;
  focus: JSX.Element;
  activities: JSX.Element[];
  faq: JSX.Element[];
  tips: JSX.Element[];
};

const RightSidebar = ({ title, focus, activities, faq, tips }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F5F5'
      }}
    >
      {title}
      {focus}
      {activities}
      {faq}
      {tips}
    </Box>
  );
};

export default RightSidebar;
