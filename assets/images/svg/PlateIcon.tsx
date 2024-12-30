import * as React from "react"
import Svg, { Rect, Circle, SvgProps } from "react-native-svg"

function PlateIcon(props: SvgProps) {
  return (
    <Svg
      width={18}
      height={15}
      viewBox="0 0 18 15"
      fill="none"
      {...props}
    >
      <Rect
        x={0.87915}
        y={0.958618}
        width={16.2417}
        height={12.576}
        rx={1.25}
        stroke="#B8B8B8"
        strokeWidth={1.5}
      />
      <Rect
        x={2.80957}
        y={3.65491}
        width={2.55269}
        height={2.55269}
        rx={1.27635}
        fill="#B8B8B8"
      />
      <Rect
        x={7.95471}
        y={3.65491}
        width={7.10815}
        height={2.55269}
        rx={1.27635}
        fill="#B8B8B8"
      />
      <Rect
        x={2.97241}
        y={7.66675}
        width={12.0905}
        height={2.55269}
        rx={1.27635}
        fill="#B8B8B8"
      />
      <Circle cx={6.65853} cy={5.74105} r={0.466512} fill="#B8B8B8" />
    </Svg>
  )
}

export default PlateIcon
