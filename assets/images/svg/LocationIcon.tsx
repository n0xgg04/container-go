import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function LocationIcon(props: SvgProps) {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M19.625 1l-6.5 18a.55.55 0 01-1 0l-3.5-7-7-3.5a.55.55 0 010-1l18-6.5z"
        stroke="#1699C2"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default LocationIcon;
