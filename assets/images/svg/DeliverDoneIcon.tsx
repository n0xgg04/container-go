import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

function DeliverPendingIcon(props: SvgProps) {
  return (
    <Svg width={40} height={32} viewBox="0 0 40 32" fill="none" {...props}>
      <G clipPath="url(#clip0_7055_8512)">
        <Path
          d="M3 0a3 3 0 00-3 3v20a3 3 0 003 3h1c0 3.313 2.688 6 6 6 3.313 0 6-2.688 6-6h8c0 3.313 2.688 6 6 6 3.313 0 6-2.688 6-6h2c1.106 0 2-.894 2-2 0-1.106-.894-2-2-2v-7.169A4.002 4.002 0 0036.831 12L32 7.169A4.001 4.001 0 0029.169 6H26V3a3 3 0 00-3-3H3zm23 10h3.169L34 14.831V16h-8v-6zM7 26a3 3 0 116 0 3 3 0 01-6 0zm23-3a3 3 0 110 6 3 3 0 010-6z"
          fill="#0A9345"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.333 19.55a6.665 6.665 0 006.16-9.218 6.667 6.667 0 10-6.16 9.218zm3.532-8.415l-1.138-.948-3.185 3.822-1.648-1.65-1.047 1.048 2.795 2.796 4.223-5.067z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_7055_8512">
          <Path fill="#fff" d="M0 0H40V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default DeliverPendingIcon;
