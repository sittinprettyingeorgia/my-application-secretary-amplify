import useCurrentUser from '@/hooks/useCurrentUser';
import RequireAuth from '@/shared/RequireAuth';
import Spinner from '@/shared/Spinner';
import Wrapper from '@/shared/Wrapper';
import { useRouter } from 'next/router';

const DashboardPage = () => {
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
 * 3. Dashboard should display display data visualization of job application details.
 *  which should include things like benefits, salary(posted/not), remote, etc.
 */
