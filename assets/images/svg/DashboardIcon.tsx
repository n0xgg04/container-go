import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function DashboardIcon(props: SvgProps) {
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M5.479 21.901c-.55 0-1.021-.196-1.413-.588a1.922 1.922 0 01-.587-1.412v-6.25h7v8.25h-5zm7 0v-8.25h9v6.25c0 .55-.196 1.021-.588 1.413a1.922 1.922 0 01-1.412.587h-7zm-9-10.25v-5.75c0-.55.196-1.02.588-1.413a1.922 1.922 0 011.412-.587h14c.55 0 1.02.196 1.413.588.392.392.587.863.587 1.412v5.75h-18z"
        fill="gray"
      />
    </Svg>
  );
}

export default DashboardIcon;
