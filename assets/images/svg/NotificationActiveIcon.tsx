import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function NotificationActiveIcon(props: SvgProps) {
  return (
    <Svg width={29} height={28} viewBox="0 0 29 28" fill="none" {...props}>
      <Path
        d="M14.252 23.335a2.334 2.334 0 002.316-2.042c.02-.16-.113-.292-.274-.292H12.21c-.161 0-.294.132-.274.292a2.334 2.334 0 002.316 2.042zM8.417 10.499a5.835 5.835 0 1111.67 0v3.44c0 .058.016.112.048.161l1.987 2.982a1.772 1.772 0 01-1.473 2.752H7.855a1.77 1.77 0 01-1.474-2.753l1.987-2.98a.303.303 0 00.05-.163V10.5zm5.835-4.084a4.084 4.084 0 00-4.084 4.084v3.44c0 .403-.12.796-.343 1.131l-1.987 2.982-.004.012.001.007c0 .002.002.005.005.007l.007.005.008.001H20.65l.008-.001.007-.005.005-.007v-.008l-.003-.012-1.987-2.98a2.042 2.042 0 01-.343-1.132V10.5a4.084 4.084 0 00-4.084-4.084z"
        fill="#00AD4B"
      />
    </Svg>
  );
}

export default NotificationActiveIcon;
