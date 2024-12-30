import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function PhoneIcon(props: SvgProps) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <Path
        d="M1.163 2.597L2.827.934a1.263 1.263 0 011.792 0l1.79 1.791a1.263 1.263 0 010 1.792L5.1 5.827c.306.675.733 1.29 1.258 1.814a6.177 6.177 0 001.814 1.262l1.31-1.31a1.263 1.263 0 011.791 0l1.793 1.79a1.263 1.263 0 01.371.897c0 .339-.132.658-.371.897l-1.661 1.66a2.054 2.054 0 01-1.78.572c-2.106-.347-4.195-1.467-5.881-3.151C2.059 8.575.94 6.488.589 4.375a2.056 2.056 0 01.574-1.778z"
        fill="#1699C2"
      />
    </Svg>
  );
}

export default PhoneIcon;
