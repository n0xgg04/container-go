import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function ArrowDownIcon(props: SvgProps) {
  return (
    <Svg width={18} height={11} viewBox="0 0 18 11" fill="none" {...props}>
      <Path
        d="M16.92 1.204a1.124 1.124 0 00-1.593 0L8.625 7.906 1.921 1.204A1.127 1.127 0 00.327 2.798l7.5 7.5a1.125 1.125 0 001.594 0l7.5-7.5a1.125 1.125 0 000-1.594z"
        fill="#E2E2E2"
      />
    </Svg>
  );
}

export default ArrowDownIcon;
