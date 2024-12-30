import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function CloseIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M10.7 10.793L8.354 8.446 8 8.093l-.354.353L5.3 10.793l-.093-.093 2.347-2.346L7.907 8l-.353-.354L5.207 5.3l.093-.093 2.346 2.347.354.353.354-.353L10.7 5.207l.093.093-2.347 2.346L8.093 8l.353.354 2.347 2.346-.093.093zM8 .5A7.457 7.457 0 00.5 8c0 4.176 3.324 7.5 7.5 7.5s7.5-3.324 7.5-7.5S12.176.5 8 .5z"
        fill="gray"
        stroke="#fff"
      />
    </Svg>
  );
}

export default CloseIcon;
