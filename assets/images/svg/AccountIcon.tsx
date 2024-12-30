import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function AccountIcon(props: SvgProps) {
  return (
    <Svg width={29} height={29} viewBox="0 0 29 29" fill="none" {...props}>
      <Path
        d="M14.479 5.568a4.667 4.667 0 110 9.333 4.667 4.667 0 010-9.333zm0 2.333a2.333 2.333 0 100 4.667 2.333 2.333 0 000-4.667zm0 8.167c3.115 0 9.333 1.551 9.333 4.666v3.5H5.145v-3.5c0-3.115 6.219-4.666 9.334-4.666zm0 2.216c-3.465 0-7.117 1.704-7.117 2.45v1.284h14.233v-1.284c0-.746-3.651-2.45-7.116-2.45z"
        fill="gray"
      />
    </Svg>
  );
}

export default AccountIcon;
