import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function CallIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M1.244 3.395L3.74.902a1.894 1.894 0 012.688 0l2.686 2.686a1.895 1.895 0 010 2.688L7.15 8.24a9.228 9.228 0 001.887 2.72 9.263 9.263 0 002.72 1.895l1.965-1.964a1.896 1.896 0 012.688 0l2.688 2.683a1.897 1.897 0 010 2.69l-2.491 2.492a3.08 3.08 0 01-2.67.858c-3.159-.52-6.292-2.2-8.821-4.727C2.589 12.363.91 9.23.384 6.062a3.085 3.085 0 01.86-2.667z"
        fill="gray"
      />
    </Svg>
  );
}

export default CallIcon;
