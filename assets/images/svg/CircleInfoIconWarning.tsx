import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const CircleInfoIconWarning = (props: SvgProps) => {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M9 0C13.9707 0 18 4.0293 18 9C18 13.9707 13.9707 18 9 18C4.0293 18 0 13.9707 0 9C0 4.0293 4.0293 0 9 0ZM9 11.7C8.7613 11.7 8.53239 11.7948 8.3636 11.9636C8.19482 12.1324 8.1 12.3613 8.1 12.6C8.1 12.8387 8.19482 13.0676 8.3636 13.2364C8.53239 13.4052 8.7613 13.5 9 13.5C9.23869 13.5 9.46761 13.4052 9.6364 13.2364C9.80518 13.0676 9.9 12.8387 9.9 12.6C9.9 12.3613 9.80518 12.1324 9.6364 11.9636C9.46761 11.7948 9.23869 11.7 9 11.7ZM9 3.6C8.77956 3.60003 8.5668 3.68096 8.40206 3.82744C8.23733 3.97393 8.13209 4.17577 8.1063 4.3947L8.1 4.5V9.9C8.10025 10.1294 8.18809 10.35 8.34556 10.5168C8.50304 10.6836 8.71826 10.784 8.94726 10.7975C9.17625 10.8109 9.40174 10.7364 9.57765 10.5892C9.75356 10.4419 9.86661 10.2331 9.8937 10.0053L9.9 9.9V4.5C9.9 4.2613 9.80518 4.03239 9.6364 3.8636C9.46761 3.69482 9.23869 3.6 9 3.6Z"
        fill="#F4A100"
      />
    </Svg>
  );
};

export default CircleInfoIconWarning;