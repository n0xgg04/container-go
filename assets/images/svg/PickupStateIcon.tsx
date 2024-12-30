import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function PickupStateIcon(props: SvgProps) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <Path
        d="M16 1C7.716 1 1 7.716 1 16c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15zm2.572 14.152V24.5h-5.143v-9.348H8L16 7.5l8 7.652h-5.428z"
        fill="#00AD4B"
      />
    </Svg>
  )
}

export default PickupStateIcon
