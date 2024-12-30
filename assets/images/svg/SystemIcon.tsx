import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SystemIcon = (props: SvgProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M20.2319 10.055C20.7119 9.515 21.5399 8.699 21.4959 8.366C21.5299 8.043 21.3549 7.739 21.0049 7.132L20.5109 6.276C20.1379 5.628 19.9509 5.304 19.6339 5.175C19.3159 5.045 18.9569 5.147 18.2389 5.351L17.0189 5.695C16.5589 5.801 16.0789 5.741 15.6599 5.525L15.3229 5.331C14.9637 5.10066 14.6876 4.76147 14.5349 4.363L14.2009 3.366C13.9809 2.706 13.8709 2.376 13.6109 2.187C13.3479 2 12.9999 2 12.3059 2H11.1919C10.4969 2 10.1499 2 9.88895 2.188C9.62695 2.378 9.51795 2.708 9.29795 3.368L8.96395 4.364C8.81127 4.76247 8.53515 5.10166 8.17595 5.332L7.83895 5.527C7.41995 5.742 6.93895 5.802 6.47995 5.696L5.25995 5.352C4.54195 5.148 4.18295 5.046 3.86495 5.176C3.54795 5.305 3.36095 5.629 2.98795 6.276L2.49395 7.133C2.14395 7.74 1.96895 8.044 2.00395 8.367C2.03695 8.69 2.27095 8.951 2.73995 9.472L3.76995 10.624C4.02295 10.944 4.20195 11.5 4.20195 11.999C4.20195 12.499 4.02195 13.055 3.77095 13.374L2.73995 14.526C2.27095 15.047 2.03695 15.307 2.00295 15.631C1.96895 15.955 2.14395 16.258 2.49395 16.865L2.98795 17.721C3.36095 18.369 3.54795 18.693 3.86495 18.822C4.18295 18.952 4.54195 18.85 5.25995 18.646L6.47995 18.302C6.93915 18.1967 7.42079 18.2569 7.83995 18.472L8.17595 18.666C8.53495 18.896 8.81095 19.235 8.96395 19.634L9.29795 20.631C9.51795 21.291 9.63795 21.634 9.83895 21.779C9.89895 21.822 10.1389 22.019 10.7269 22M14.9999 17.218C14.9999 17.218 15.9999 17.502 16.4999 18.502C16.4999 18.502 17.5959 16.002 19.0079 15.502"
        stroke="#808080"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.1599 9.443C13.3199 8.759 12.6599 8.495 11.6999 8.495C9.89986 8.519 8.25586 10.005 8.25586 11.939C8.25586 13.004 8.57986 13.679 9.19186 14.387M21.9999 16.999C21.9999 18.3251 21.4731 19.5968 20.5354 20.5345C19.5977 21.4722 18.3259 21.999 16.9999 21.999C15.6738 21.999 14.402 21.4722 13.4643 20.5345C12.5266 19.5968 11.9999 18.3251 11.9999 16.999C11.9999 15.6729 12.5266 14.4011 13.4643 13.4635C14.402 12.5258 15.6738 11.999 16.9999 11.999C18.3259 11.999 19.5977 12.5258 20.5354 13.4635C21.4731 14.4011 21.9999 15.6729 21.9999 16.999Z"
        stroke="#808080"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default SystemIcon;