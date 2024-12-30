import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

function PhoneLoginIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0_3330_19954)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.552 22.133c-1.44-.053-5.521-.617-9.795-4.89-4.273-4.274-4.836-8.354-4.89-9.795-.08-2.196 1.602-4.329 3.545-5.162a1.47 1.47 0 011.445.159c1.6 1.166 2.704 2.93 3.652 4.317a1.504 1.504 0 01-.256 1.986l-1.951 1.449a.48.48 0 00-.142.616c.442.803 1.228 1.999 2.128 2.899.901.9 2.153 1.738 3.012 2.23a.484.484 0 00.644-.162l1.27-1.933a1.502 1.502 0 012.056-.332c1.407.974 3.049 2.059 4.251 3.598a1.47 1.47 0 01.189 1.485c-.837 1.953-2.955 3.616-5.158 3.535z"
          fill="gray"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3330_19954">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default PhoneLoginIcon;
