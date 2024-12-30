import * as React from 'react';
import { useSession } from '@/shared/guards/AuthencationGuard';
import { Href, Redirect } from 'expo-router';

type Props = {
  redirectTo: Href<string | object>;
};

export default function Guard({
  children,
  redirectTo,
}: Props & React.PropsWithChildren) {
  const { isLoggedIn } = useSession();

  if (!isLoggedIn) {
    return <Redirect href={redirectTo} />;
  }

  return <>{children}</>;
}
