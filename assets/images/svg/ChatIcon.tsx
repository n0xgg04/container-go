import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function ChatIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.25 3A2.75 2.75 0 013 .25h14A2.75 2.75 0 0119.75 3v10A2.75 2.75 0 0117 15.75H5.961c-.38 0-.739.173-.976.47l-2.33 2.913c-.798.996-2.405.433-2.405-.843V3zm4 7A.75.75 0 015 9.25h10a.75.75 0 110 1.5H5a.75.75 0 01-.75-.75zM5 5.25a.75.75 0 000 1.5h6a.75.75 0 100-1.5H5z"
        fill="gray"
      />
    </Svg>
  );
}

export default ChatIcon;
