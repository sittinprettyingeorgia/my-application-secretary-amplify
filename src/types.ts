import { WithAuthenticatorProps } from '@aws-amplify/ui-react';

export interface AuthProps extends WithAuthenticatorProps {
  isPassedToWithAuthenticator: boolean;
}

export type Plan = {
  cost: number;
  limit: number;
};
