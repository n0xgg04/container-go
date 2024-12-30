import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

function ArrowUpCircleIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <G clipPath="url(#clip0_7055_6932)">
        <Path
          d="M8 .5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm1.286 7.076v4.674H6.714V7.576H4L8 3.75l4 3.826H9.286z"
          fill="#00AD4B"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_7055_6932">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default ArrowUpCircleIcon;
