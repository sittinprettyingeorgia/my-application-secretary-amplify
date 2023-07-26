import useTitle from '@/hooks/useTitle';
import RequireAuth from '@/shared/RequireAuth';
import Wrapper from '@/shared/Wrapper';

const ProfilePage = () => {
  useTitle('Profile');
  return <Wrapper>PROFILE</Wrapper>;
};

const Profile = () => {
  return (
    <RequireAuth>
      <ProfilePage />
    </RequireAuth>
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
