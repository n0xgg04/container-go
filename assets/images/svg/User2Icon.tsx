import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function User2Icon(props: SvgProps) {
  return (
    <Svg width={14} height={15} viewBox="0 0 14 15" fill="none" {...props}>
      <Path
        d="M9.881 8.082a6.75 6.75 0 013.861 5.785.843.843 0 11-1.685.079 5.062 5.062 0 00-10.114 0 .844.844 0 01-1.685-.08 6.75 6.75 0 013.86-5.784 4.499 4.499 0 115.763 0zm-.068-3.457a2.812 2.812 0 10-5.625 0 2.812 2.812 0 005.625 0z"
        fill="gray"
      />
    </Svg>
  );
}

export default User2Icon;
