import useCurrentUser from '@/hooks/useCurrentUser';
import useTitle from '@/hooks/useTitle';
import RequireAuth from '@/shared/RequireAuth';
import Spinner from '@/shared/Spinner';
import Wrapper from '@/shared/Wrapper';
import { useRouter } from 'next/router';

const DashboardPage = () => {
  useTitle('Dashboard');
  const { user, isLoading, isError } = useCurrentUser();
  const router = useRouter();

  if (isLoading) {
    return <Spinner />;
  }

  return <Wrapper>DASHBOARD</Wrapper>;
};

const Dashboard = () => {
  return (
    <RequireAuth>
      <DashboardPage />
    </RequireAuth>
  );
};

export default Dashboard;

/**TODO:
 * 1. Dashboard should display number of jobs applied.
 * 2. Dashboard should display failed questions.
 * 3. Dashboard should display sidebar.??
 * 4. Dashboard should display user summary. (with button link to modify user)
 * 5. Dashboard should display account summary.(with button link to modify account)
 * 5. Dashboard should display display data visualization(application summary)
 *    of job application details.
 *    which should include things like benefits, salary(posted/not), remote, etc.
 */
