import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function DoneDelivery(props: SvgProps) {
  return (
    <Svg width={19} height={19} viewBox="0 0 19 19" fill="none" {...props}>
      <Path
        d="M8.182 12.735L5 9.552l1.06-1.06 2.122 2.12 4.242-4.242 1.062 1.061-5.304 5.304z"
        fill="#0A9345"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 9.5a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0zm8.25 6.75a6.75 6.75 0 110-13.5 6.75 6.75 0 010 13.5z"
        fill="#0A9345"
      />
    </Svg>
  );
}

export default DoneDelivery;
