import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function ContainerIcon(props: SvgProps) {
  return (
    <Svg width={29} height={28} viewBox="0 0 29 28" fill="none" {...props}>
      <Path
        d="M23.583 11.667H21.25l-5.588-4.084a2.159 2.159 0 00.921-1.75 2.368 2.368 0 00-1.166-2.008V2.333H14.25v2.334a1.167 1.167 0 11-1.167 1.166h-1.166a2.158 2.158 0 00.928 1.75L7.25 11.667H4.917A2.333 2.333 0 002.583 14v9.333a2.333 2.333 0 002.334 2.334h18.666a2.33 2.33 0 002.334-2.334V14a2.334 2.334 0 00-2.334-2.333zm-9.333-3.5c.007 0 4.667 3.5 4.667 3.5H9.583l4.667-3.5zm9.333 15.166H4.917V14h18.666v9.333z"
        fill="gray"
      />
      <Path
        d="M16.583 22.167A1.167 1.167 0 0017.75 21v-4.667a1.166 1.166 0 10-2.333 0V21a1.167 1.167 0 001.166 1.167zm4.667 0A1.167 1.167 0 0022.417 21v-4.667a1.166 1.166 0 10-2.334 0V21a1.167 1.167 0 001.167 1.167zm-14 0A1.167 1.167 0 008.417 21v-4.667a1.166 1.166 0 10-2.334 0V21a1.167 1.167 0 001.167 1.167zm4.667 0A1.167 1.167 0 0013.083 21v-4.667a1.166 1.166 0 10-2.333 0V21a1.167 1.167 0 001.167 1.167z"
        fill="gray"
      />
    </Svg>
  );
}

export default ContainerIcon;
