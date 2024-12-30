import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function EyeIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M1.182 12C2.122 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.818-9zM12 17a5 5 0 100-10 5 5 0 000 10zm0-2a3 3 0 110-6 3 3 0 010 6z"
        fill="gray"
      />
    </Svg>
  );
}

export default EyeIcon;
