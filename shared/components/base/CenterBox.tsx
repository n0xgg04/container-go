import * as React from 'react';
import { Box } from '@/shared/components/base/Box';
import { cn } from '@/shared/utils';

const CenterBox = React.memo(
  ({ children, className, ...props }: React.ComponentProps<typeof Box>) => {
    const cls = React.useMemo(
      () => cn('flex flex-row justify-center items-center', className),
      [className]
    );
    return (
      <Box className={cls} {...props}>
        {children}
      </Box>
    );
  }
);

export default CenterBox;
