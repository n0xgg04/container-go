import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function UserIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M6.75 7.5a5.25 5.25 0 1010.5 0 5.25 5.25 0 00-10.5 0zM19.5 21.75H3.75A.75.75 0 013 21v-2.25A3.75 3.75 0 016.75 15h10.5A3.75 3.75 0 0121 18.75V21a.75.75 0 01-.75.75h-.75z"
        fill="gray"
      />
    </Svg>
  );
}

export default UserIcon;
