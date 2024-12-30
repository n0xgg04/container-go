import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function MailInfoIcon(props: SvgProps) {
  return (
    <Svg width={15} height={12} viewBox="0 0 15 12" fill="none" {...props}>
      <Path
        d="M1.5 1.25l4.581 3.459.001.002c.509.372.763.559 1.042.631a1.5 1.5 0 00.752 0c.279-.072.534-.259 1.044-.633 0 0 2.938-2.254 4.58-3.459M.75 8.6V2.9c0-.84 0-1.26.163-1.581.145-.283.373-.511.656-.655C1.89.5 2.31.5 3.15.5h8.7c.84 0 1.26 0 1.58.163.283.144.513.373.656.656.164.32.164.74.164 1.579v5.705c0 .838 0 1.257-.164 1.578a1.502 1.502 0 01-.656.655c-.32.164-.74.164-1.578.164H3.148c-.839 0-1.259 0-1.579-.164a1.5 1.5 0 01-.655-.655C.75 9.86.75 9.44.75 8.6z"
        stroke="#3D3D3D"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default MailInfoIcon;
