import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"

function ShippingWhiteIcon(props: SvgProps) {
  return (
    <Svg
      width={23}
      height={18}
      viewBox="0 0 23 18"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_7320_2427)">
        <Path
          d="M22.188 12.375h-.563v-3.8c0-.447-.18-.876-.496-1.192L17.617 3.87a1.688 1.688 0 00-1.192-.496h-1.55V1.687C14.875.756 14.119 0 13.187 0h-9C3.256 0 2.5.756 2.5 1.688v1.687H.531a.282.282 0 00-.281.281v.563c0 .154.127.281.281.281h9.563c.154 0 .281.127.281.281v.563a.282.282 0 01-.281.281H1.656a.282.282 0 00-.281.281v.563c0 .154.127.281.281.281H8.97c.154 0 .281.127.281.281v.563a.282.282 0 01-.281.281H.53a.282.282 0 00-.281.281v.563c0 .154.127.281.281.281h7.313c.154 0 .281.127.281.281v.563a.282.282 0 01-.281.281H2.5v4.5a3.376 3.376 0 006.75 0h4.5a3.376 3.376 0 006.75 0h1.688c.309 0 .562-.253.562-.563v-1.124a.564.564 0 00-.563-.563zM5.875 16.313a1.688 1.688 0 110-3.376 1.688 1.688 0 010 3.376zm11.25 0a1.688 1.688 0 11.001-3.376 1.688 1.688 0 01-.001 3.376zM19.938 9h-5.063V5.062h1.55l3.512 3.513V9z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_7320_2427">
          <Path fill="#fff" transform="translate(.25)" d="M0 0H22.5V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default ShippingWhiteIcon
