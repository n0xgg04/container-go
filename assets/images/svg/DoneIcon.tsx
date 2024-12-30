import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function DoneIcon(props: SvgProps) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 13.75A6.75 6.75 0 107 .25a6.75 6.75 0 000 13.5zm-.174-4.02l3.75-4.5-1.152-.96-3.225 3.87L4.53 6.47 3.47 7.53l2.25 2.25.58.58.526-.63z"
        fill="#00AD4B"
      />
    </Svg>
  );
}

export default DoneIcon;
