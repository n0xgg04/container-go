import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function RateStarIcon(props: SvgProps) {
  return (
    <Svg width={40} height={41} viewBox="0 0 40 41" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 .75a2.866 2.866 0 00-2.64 1.703L12.927 12.2 2.501 13.686c-2.366.34-3.336 3.253-1.653 4.956l7.71 7.786L6.68 37.32a2.923 2.923 0 002.867 3.427 2.866 2.866 0 001.43-.387L20 35.224l9.023 5.14c.466.266.956.386 1.433.386a2.924 2.924 0 002.863-3.423l-1.877-10.896 7.71-7.786c1.683-1.703.713-4.616-1.654-4.956l-10.425-1.487L22.64 2.46A2.867 2.867 0 0020 .75z"
        fill="#FFD339"
      />
    </Svg>
  );
}

export default RateStarIcon;
