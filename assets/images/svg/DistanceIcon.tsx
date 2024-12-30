import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function DistanceIcon(props: SvgProps) {
  return (
    <Svg
      width={16}
      height={18}
      viewBox="0 0 16 18"
      fill="none"
      {...props}
    >
      <Path
        d="M12.667 12.58a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm-2.084-10a3.75 3.75 0 110 7.5H4.75a2.083 2.083 0 000 4.166H8.5a.833.833 0 110 1.667H4.75a3.75 3.75 0 010-7.5h5.833a2.083 2.083 0 000-4.166h-3.75a.833.833 0 010-1.667h3.75zM2.667.913a2.5 2.5 0 110 5 2.5 2.5 0 010-5z"
        fill="#B8B8B8"
      />
    </Svg>
  )
}

export default DistanceIcon
