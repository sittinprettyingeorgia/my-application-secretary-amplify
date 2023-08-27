import useTitle from '@/hooks/useTitle';
import AuthWrapper from '@/shared/AuthWrapper';

const Profile = () => {
  useTitle('Profile');
  return <AuthWrapper>PROFILE</AuthWrapper>;
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
