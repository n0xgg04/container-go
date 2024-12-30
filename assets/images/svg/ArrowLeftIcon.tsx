import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function ArrowLeftIcon(props: SvgProps) {
  return (
    <Svg width={16} height={26} viewBox="0 0 16 26" fill="none" {...props}>
      <Path
        d="M.7 12.776c.013-.58.212-1.062.679-1.515L12.282.6c.354-.369.793-.538 1.331-.538 1.062 0 1.912.835 1.912 1.897 0 .524-.213 1.005-.595 1.388l-9.685 9.416 9.685 9.445c.383.382.595.85.595 1.388 0 1.062-.85 1.911-1.912 1.911-.524 0-.977-.184-1.33-.552L1.378 14.291c-.467-.453-.68-.934-.68-1.515z"
        fill="#000"
      />
    </Svg>
  );
}

export default ArrowLeftIcon;
