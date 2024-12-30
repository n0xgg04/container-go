import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

const InfoIcon = React.memo((props: SvgProps) => {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <G clipPath="url(#clip0_7320_2386)" fill="gray">
        <Path d="M7.37 6.7h1.25v5H7.37v-5zM8 5.5a.65.65 0 100-1.3.65.65 0 000 1.3z" />
        <Path d="M8 .5A7.77 7.77 0 000 8a7.77 7.77 0 008 7.5A7.77 7.77 0 0016 8 7.77 7.77 0 008 .5zm0 13.75A6.52 6.52 0 011.25 8 6.52 6.52 0 018 1.75 6.52 6.52 0 0114.75 8 6.52 6.52 0 018 14.25z" />
      </G>
      <Defs>
        <ClipPath id="clip0_7320_2386">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
});

export default InfoIcon;
