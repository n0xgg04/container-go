import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function FailedIcon2(props: SvgProps) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <Path
        d="M7.25.25a6.75 6.75 0 110 13.5 6.75 6.75 0 010-13.5zm0 8.775a.675.675 0 100 1.35.675.675 0 000-1.35zm0-6.075a.675.675 0 00-.67.596l-.005.079v4.05a.675.675 0 001.345.079l.005-.079v-4.05a.675.675 0 00-.675-.675z"
        fill="#FD5D57"
      />
    </Svg>
  );
}

export default FailedIcon2;
