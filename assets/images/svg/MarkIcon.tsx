import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function MarkIconLocation(props: SvgProps) {
  return (
    <Svg width={29} height={40} viewBox="0 0 29 40" fill="none" {...props}>
      <Path
        d="M14.61.188C7.03.188.9 6.318.9 13.897c0 10.281 13.709 25.458 13.709 25.458s13.708-15.177 13.708-25.458c0-7.579-6.13-13.709-13.708-13.709zm0 18.605a4.896 4.896 0 110-9.792 4.896 4.896 0 010 9.792z"
        fill="#EC0900"
      />
    </Svg>
  );
}

export default MarkIconLocation;
