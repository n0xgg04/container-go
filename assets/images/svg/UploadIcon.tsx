import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function UploadIcon(props: SvgProps) {
  return (
    <Svg width={14} height={17} viewBox="0 0 14 17" fill="none" {...props}>
      <Path
        d="M5 13h4c.55 0 1-.45 1-1V7h1.59c.89 0 1.34-1.08.71-1.71L7.71.7A.996.996 0 006.3.7L1.71 5.29c-.63.63-.19 1.71.7 1.71H4v5c0 .55.45 1 1 1zm-4 2h12c.55 0 1 .45 1 1s-.45 1-1 1H1c-.55 0-1-.45-1-1s.45-1 1-1z"
        fill="#34C759"
      />
    </Svg>
  );
}

export default UploadIcon;
