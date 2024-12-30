import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

function LogOutIcon(props: SvgProps) {
  return (
    <Svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
      <G clipPath="url(#clip0_4544_4475)">
        <Path
          d="M12.5.833a1.846 1.846 0 00-1.846 1.846v9.231a1.846 1.846 0 003.692 0V2.68A1.846 1.846 0 0012.5.832zM5.894 3.228a1.385 1.385 0 00-.721.317 11.812 11.812 0 00-4.5 9.288c0 6.515 5.31 11.828 11.827 11.828s11.827-5.313 11.827-11.828c0-3.76-1.755-7.123-4.5-9.289a1.385 1.385 0 00-1.73 2.164 9.05 9.05 0 013.461 7.125 9.036 9.036 0 01-9.058 9.059 9.036 9.036 0 01-9.058-9.059 9.054 9.054 0 013.461-7.125 1.385 1.385 0 00-1.009-2.48z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4544_4475">
          <Path fill="#fff" transform="translate(.5 .833)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default LogOutIcon;
