import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function BackDarkIcon(props: SvgProps) {
  return (
    <Svg width={13} height={22} viewBox="0 0 13 22" fill="none" {...props}>
      <Path
        d="M11.125 2l-9 9 9 9"
        stroke="gray"
        strokeWidth={2.25}
        strokeMiterlimit={10}
        strokeLinecap="square"
      />
    </Svg>
  );
}

export default BackDarkIcon;
