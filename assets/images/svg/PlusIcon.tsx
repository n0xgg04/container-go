import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function PlusIcon(props: SvgProps) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <Path
        d="M13 7.998H8v5a1 1 0 11-2 0v-5H1a1 1 0 010-2h5v-5a1 1 0 012 0v5h5a1 1 0 110 2z"
        fill="#fff"
      />
    </Svg>
  );
}

export default PlusIcon;
