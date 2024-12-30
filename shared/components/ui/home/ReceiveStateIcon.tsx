import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function ReceiveStateIcon(props: SvgProps) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
      <Path
        d="M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm-2.572-14.152V6.5h5.143v9.348H23L15 23.5l-8-7.652h5.428z"
        fill="#1699C2"
      />
    </Svg>
  );
}

export default ReceiveStateIcon;
