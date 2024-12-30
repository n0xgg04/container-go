import * as React from 'react';
import Svg, { G, Path, Rect, Defs, ClipPath, SvgProps } from 'react-native-svg';

function DeliverRunningIcon(props: SvgProps) {
  return (
    <Svg width={40} height={32} viewBox="0 0 40 32" fill="none" {...props}>
      <G clipPath="url(#clip0_7055_7415)">
        <Path
          d="M3 0a3 3 0 00-3 3v20a3 3 0 003 3h1c0 3.313 2.688 6 6 6 3.313 0 6-2.688 6-6h8c0 3.313 2.688 6 6 6 3.313 0 6-2.688 6-6h2c1.106 0 2-.894 2-2 0-1.106-.894-2-2-2v-7.169A4.002 4.002 0 0036.831 12L32 7.169A4.001 4.001 0 0029.169 6H26V3a3 3 0 00-3-3H3zm23 10h3.169L34 14.831V16h-8v-6zM7 26a3 3 0 116 0 3 3 0 01-6 0zm23-3a3 3 0 110 6 3 3 0 010-6z"
          fill="#1699C2"
        />
        <Rect
          x={7.45346}
          y={6.39001}
          width={11.3683}
          height={2.66667}
          rx={1.33333}
          fill="#fff"
        />
        <Rect
          x={3.19034}
          y={11.7369}
          width={15.6314}
          height={2.66667}
          rx={1.33333}
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_7055_7415">
          <Path fill="#fff" d="M0 0H40V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default DeliverRunningIcon;
