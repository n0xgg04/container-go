import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function DeliveryUpIcon(props: SvgProps) {
  return (
    <Svg width={15} height={16} viewBox="0 0 15 16" fill="none" {...props}>
      <Path
        d="M7.5.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm1.286 7.076v4.674H6.214V7.576H3.5l4-3.826 4 3.826H8.786z"
        fill="#1699C2"
      />
    </Svg>
  );
}

export default DeliveryUpIcon;
