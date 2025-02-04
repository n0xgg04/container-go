import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function Location3Icon(props: SvgProps) {
  return (
    <Svg width={15} height={17} viewBox="0 0 15 17" fill="none" {...props}>
      <Path
        d="M7.5 1.75A5.25 5.25 0 002.25 7c0 2.146 1.337 4.217 2.803 5.821.75.818 1.57 1.57 2.447 2.247a19.507 19.507 0 002.447-2.245C11.412 11.217 12.75 9.147 12.75 7A5.25 5.25 0 007.5 1.75zm0 15.16l-.425-.292-.003-.002-.004-.003-.015-.011-.056-.04-.203-.148a20.998 20.998 0 01-2.847-2.58C2.412 12.157.75 9.727.75 7a6.75 6.75 0 0113.5 0c0 2.728-1.664 5.158-3.197 6.834a21.001 21.001 0 01-2.847 2.58c-.085.064-.171.127-.258.188l-.016.01-.005.005h-.001l-.426.294zm0-11.41a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4.5 7a3 3 0 116 0 3 3 0 01-6 0z"
        fill="#fff"
      />
    </Svg>
  );
}

export default Location3Icon;
