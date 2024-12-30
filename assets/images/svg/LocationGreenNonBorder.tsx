import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function LocationGreenNonBorder(props: SvgProps) {
  return (
    <Svg width={14} height={16} viewBox="0 0 14 16" fill="none" {...props}>
      <Path
        d="M7 0C3.585 0 .495 2.618.495 6.668c0 2.585 1.992 5.626 5.968 9.13a.827.827 0 001.082 0c3.968-3.504 5.96-6.545 5.96-9.13C13.505 2.618 10.415 0 7 0zm0 8.131a1.631 1.631 0 01-1.626-1.626c0-.895.731-1.626 1.626-1.626.894 0 1.626.731 1.626 1.626 0 .894-.732 1.626-1.626 1.626z"
        fill="#00AD4B"
      />
    </Svg>
  );
}

export default LocationGreenNonBorder;
