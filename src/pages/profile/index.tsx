import useTitle from '@/hooks/useTitle';
import Wrapper from '@/shared/Wrapper';

const ProfilePage = () => {
  useTitle('Profile');
  return <Wrapper></Wrapper>;
};

const Profile = () => {
  return (
    <Wrapper>
      <ProfilePage />
    </Wrapper>
  );
};

export default Profile;

/**TODO:
 * 1. Profile needs a way to add job preferences.
 * 2. Profile needs a way to add qualifications.
 * 3. Profile needs a way to add resume.
 * 4. Profile needs a way to add cover letter.
 * 5. Profile needs a way to add corpus questions.
 * 6. Profile needs a way to add corpus answers.
 */
