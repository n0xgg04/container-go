import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function DatePicker(props: SvgProps) {
  return (
    <Svg
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      {...props}
    >
      <Path
        d="M14 1.833h-2V.5h-2v1.333H6V.5H4v1.333H2a2 2 0 00-2 2V16.5h16V3.833a2 2 0 00-2-2zM2 14.5V7.167h12V14.5H2z"
        fill="gray"
      />
    </Svg>
  )
}

export default DatePicker
