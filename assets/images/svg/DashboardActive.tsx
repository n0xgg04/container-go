import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function DashboardActiveIcon(props: SvgProps) {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M5.75 21c-.55 0-1.021-.196-1.413-.588A1.922 1.922 0 013.75 19v-6.25h7V21h-5zm7 0v-8.25h9V19c0 .55-.196 1.021-.588 1.413A1.922 1.922 0 0119.75 21h-7zm-9-10.25V5c0-.55.196-1.021.588-1.413A1.922 1.922 0 015.75 3h14c.55 0 1.021.196 1.413.588.392.392.588.863.587 1.412v5.75h-18z"
        fill="#0A9345"
      />
    </Svg>
  );
}

export default DashboardActiveIcon;
