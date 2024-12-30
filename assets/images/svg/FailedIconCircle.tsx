import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function FailedIconCircle(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M9 0a9 9 0 019 9 9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 019-9zm0 11.7a.9.9 0 100 1.8.9.9 0 000-1.8zm0-8.1a.9.9 0 00-.894.795L8.1 4.5v5.4a.9.9 0 001.794.105L9.9 9.9V4.5a.9.9 0 00-.9-.9z"
        fill="#FD5D57"
      />
    </Svg>
  );
}

export default FailedIconCircle;
