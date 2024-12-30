import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function TakePhotoIcon(props: SvgProps) {
  return (
    <Svg width={36} height={32} viewBox="0 0 36 32" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.682 9.5h2.625l.9-2.468.62-1.71a1.25 1.25 0 011.175-.822h7.995a1.25 1.25 0 011.175.825l.623 1.707.897 2.468H28a3.75 3.75 0 013.75 3.75V24.5A3.75 3.75 0 0128 28.25H8a3.75 3.75 0 01-3.75-3.75V13.25A3.75 3.75 0 018 9.5h.682zM14 .75a5 5 0 00-4.7 3.293L8.68 5.75H8a7.5 7.5 0 00-7.5 7.5V24.5A7.5 7.5 0 008 32h20a7.5 7.5 0 007.5-7.5V13.25a7.5 7.5 0 00-7.5-7.5h-.683l-.62-1.707a5 5 0 00-4.7-3.293H14zm7.747 17.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zm3.75 0a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
        fill="#3D3D3D"
      />
    </Svg>
  );
}

export default TakePhotoIcon;
