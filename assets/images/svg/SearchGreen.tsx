import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SearchGreen = (props: SvgProps) => {
  return (
    <Svg width="26" height="26" viewBox="0 0 26 26" fill="none" {...props}>
      <Path
        d="M25 13V3C25 2.46957 24.7893 1.96086 24.4142 1.58579C24.0391 1.21071 23.5304 1 23 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V23C1 23.5304 1.21071 24.0391 1.58579 24.4142C1.96086 24.7893 2.46957 25 3 25H13"
        stroke="#00AD4B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.3333 22.3335C20.5425 22.3335 22.3333 20.5426 22.3333 18.3335C22.3333 16.1244 20.5425 14.3335 18.3333 14.3335C16.1242 14.3335 14.3333 16.1244 14.3333 18.3335C14.3333 20.5426 16.1242 22.3335 18.3333 22.3335Z"
        stroke="#00AD4B"
        stroke-width="2"
      />
      <Path
        d="M21.6667 20.9998L25 23.6665M6.33334 7.6665H19.6667M6.33334 12.9998H11.6667"
        stroke="#00AD4B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default SearchGreen;
