import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function PopupInfoIcon(props: SvgProps) {
  return (
    <Svg width={56} height={56} viewBox="0 0 56 56" fill="none" {...props}>
      <Path
        d="M0 28a28 28 0 1156 0 28 28 0 01-56 0zM28 5.25a22.75 22.75 0 100 45.5 22.75 22.75 0 000-45.5zm-5.25 21.875a2.625 2.625 0 012.625-2.625h3.5a2.625 2.625 0 012.625 2.625v9.625h.875a2.625 2.625 0 010 5.25h-7a2.625 2.625 0 010-5.25h.875v-7h-.875a2.625 2.625 0 01-2.625-2.625zM28 21a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"
        fill="#32B6DF"
      />
    </Svg>
  );
}

export default PopupInfoIcon;
