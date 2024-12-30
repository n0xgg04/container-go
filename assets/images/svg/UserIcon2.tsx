import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function UserIcon2(props: SvgProps) {
  return (
    <Svg width={16} height={17} viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        d="M11.201 9.091a7.5 7.5 0 014.29 6.428.937.937 0 11-1.872.087 5.624 5.624 0 00-11.238 0A.938.938 0 01.51 15.52 7.5 7.5 0 014.797 9.09a4.999 4.999 0 116.404 0zm-.076-3.841a3.125 3.125 0 10-6.25 0 3.125 3.125 0 006.25 0z"
        fill="gray"
      />
    </Svg>
  );
}

export default UserIcon2;
