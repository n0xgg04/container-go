import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function GuardIcon(props: SvgProps) {
  return (
    <Svg width={18} height={20} viewBox="0 0 18 20" fill="none" {...props}>
      <Path
        d="M8.988 19.979c-.195 0-.468-.069-.722-.206C2.66 16.843.658 15.32.658 11.824v-7.1c0-1.367.46-1.933 1.65-2.431.948-.39 4.434-1.592 5.333-1.865.42-.117.927-.215 1.347-.215.42 0 .938.088 1.358.215.888.283 4.375 1.474 5.322 1.865 1.201.508 1.65 1.064 1.65 2.432v7.1c0 3.495-1.943 5.116-7.597 7.948-.264.127-.537.206-.733.206z"
        fill="#000"
      />
    </Svg>
  );
}

export default GuardIcon;
