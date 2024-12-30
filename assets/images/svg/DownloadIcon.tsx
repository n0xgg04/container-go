import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function DownloadIcon(props: SvgProps) {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      {...props}
    >
      <Path
        d="M8.5 11.417L5.167 8.083l.933-.966L7.833 8.85V3.417h1.334V8.85L10.9 7.117l.933.966L8.5 11.417zm-5.333 2.666V10.75H4.5v2h8v-2h1.333v3.333H3.167z"
        fill="#1699C2"
      />
    </Svg>
  )
}

export default DownloadIcon
