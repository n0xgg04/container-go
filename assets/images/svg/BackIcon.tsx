import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function BackIcon(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M20.5 7l-9 9 9 9"
        stroke="#fff"
        strokeWidth={2.25}
        strokeMiterlimit={10}
        strokeLinecap="square"
      />
    </Svg>
  );
}

export default BackIcon;
