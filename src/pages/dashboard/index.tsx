import useCurrentUser from '@/hooks/useCurrentUser';
import useTitle from '@/hooks/useTitle';
import AuthWrapper from '@/shared/AuthWrapper';
import Spinner from '@/shared/Spinner';
import LeftSidebar from '@/shared/sidebar/LeftSidebar';
import RightSidebar from '@/shared/sidebar/RightSidebar';
import { useRouter } from 'next/router';

const temp = <div>temp</div>;

const Dashboard = () => {
  useTitle('Dashboard');
  const { authUser, user, isLoading, isError } = useCurrentUser();
  const router = useRouter();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <AuthWrapper>
      {/* <LeftSidebar options={[]} />
      {/* we should put our dashboard here and change the right
       sidebar based on listItem selected in left sidebar
      <RightSidebar
        title={''}
        focus={temp}
        activities={[]}
        faq={[]}
        tips={[]}
      /> */}
      <h1>ADFASDFASDFASDFASDFSADFD</h1>
    </AuthWrapper>
  );
};

export default Dashboard;

/**TODO:
 * 1. Dashboard should display number of jobs applied.
 * 2. Dashboard should display failed questions.
 * 4. Dashboard should display user summary. (with button link to modify user)
 * 5. Dashboard should display account summary.(with button link to modify account)
 * 5. Dashboard should display display data visualization(application summary)
 *    of job application details.
 *    which should include things like benefits, salary(posted/not), remote, etc.
 */
