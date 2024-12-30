import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function UserInfoIcon(props: SvgProps) {
  return (
    <Svg width={13} height={12} viewBox="0 0 13 12" fill="none" {...props}>
      <Path
        d="M6.5 5.938a2.812 2.812 0 110-5.625 2.812 2.812 0 010 5.625zm0-4.5a1.687 1.687 0 100 3.374 1.687 1.687 0 000-3.375zm5.25 9.75a.57.57 0 01-.563-.563c0-1.463-.794-2.438-4.687-2.438-3.893 0-4.688.976-4.688 2.438a.562.562 0 11-1.125 0c0-3.563 4.073-3.563 5.813-3.563 1.74 0 5.813 0 5.813 3.563a.57.57 0 01-.563.563z"
        fill="#3D3D3D"
      />
    </Svg>
  );
}

export default UserInfoIcon;
