import * as React from 'react';
import Svg, { Mask, Path, G, SvgProps } from 'react-native-svg';

function TicketIcon(props: SvgProps) {
  return (
    <Svg width={17} height={22} viewBox="0 0 17 22" fill="none" {...props}>
      <Mask
        id="a"
        //@ts-ignore
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={17}
        height={22}
      >
        <Path
          d="M15.5 1h-14a1 1 0 00-1 1v18a1 1 0 001 1h14a1 1 0 001-1V2a1 1 0 00-1-1z"
          fill="#fff"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4.5 14h7m-7 3H8"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4.5 5h7v5h-7V5z"
          fill="#fff"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Mask>
      <G mask="url(#a)">
        <Path d="M-4-1h24v24H-4V-1z" fill="gray" />
      </G>
    </Svg>
  );
}

export default TicketIcon;
