import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function LocationGreenIcon(props: SvgProps) {
  return (
    <Svg width={16} height={20} viewBox="0 0 16 20" fill="none" {...props}>
      <Path
        d="M8 0C3.8 0 0 3.22 0 8.2c0 3.18 2.45 6.92 7.34 11.23.38.33.95.33 1.33 0C13.55 15.12 16 11.38 16 8.2 16 3.22 12.2 0 8 0zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
        fill="#00AD4B"
      />
    </Svg>
  );
}

export default LocationGreenIcon;
