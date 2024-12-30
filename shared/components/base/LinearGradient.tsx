import * as React from 'react';
import {
  Canvas,
  Rect,
  LinearGradient as LinearGradientSkia,
  vec,
  RectProps,
  CanvasProps,
  SkPoint,
} from '@shopify/react-native-skia';

type Props = {
  canvasStyle?: CanvasProps['style'];
  start?: SkPoint;
  end?: SkPoint;
  colors: string[];
  width: number;
  height: number;
} & RectProps;

export function LinearGradient({
  start = vec(0, 0),
  end = vec(256, 256),
  canvasStyle,
  colors,
  width,
  height,
  ...props
}: Props) {
  return (
    <Canvas style={canvasStyle}>
      <Rect x={0} y={0} width={width} height={height} {...props}>
        <LinearGradientSkia start={start} end={end} colors={colors} />
      </Rect>
    </Canvas>
  );
}
