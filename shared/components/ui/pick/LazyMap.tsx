import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

//@ts-ignore
import { Spacing } from '@/shared/constants/spacing';
import { useTheme } from '@/shared/hooks';

const TOKEN =
  'sk.eyJ1IjoibjB4Z2cwNCIsImEiOiJjbTBnMzg3NmkxNDFnMmxzMXJtZHI5Mnh5In0.mHecyPX_49PESmBXrO6WLQ';
MapboxGL.setAccessToken(TOKEN);

type Props = {
  lat?: number;
  long?: number;
  desLat?: number;
  desLng?: number;
  zoom: $Geo;
};

const ANNOTATION_SIZE = 50;

async function getDirections(start: number[], end: number[]) {
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${TOKEN}&overview=full`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      return route.geometry.coordinates;
    } else {
      console.error('No route found');
    }
  } catch (error) {
    console.error('Error fetching directions:', error);
  }
}

const LazyMap = React.memo(({ lat, long, zoom, desLat, desLng }: Props) => {
  let [route, setRoute] = useState<[number, number][]>([]);
  const { colors } = useTheme();
  const cordianate = React.useMemo(() => [long || 105, lat || 20], [lat, long]);

  useEffect(() => {
    getDirections(cordianate, [desLng!, desLat!]).then((res) => {
      setRoute(res);
    });
  }, [cordianate, desLat, desLng, lat, long]);

  return (
    <MapboxGL.MapView
      style={{ flex: 1 }}
      projection="globe"
      zoomEnabled={true}
      scaleBarEnabled={false}
      compassEnabled={false}
    >
      {route.length > 0 && (
        <MapboxGL.ShapeSource
          id="routeSource"
          shape={
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: route,
              },
            } as any
          }
        >
          <MapboxGL.LineLayer
            id="routeLine"
            style={{
              lineColor: colors.mapLine,
              lineWidth: 5,
            }}
          />
        </MapboxGL.ShapeSource>
      )}
      <MapboxGL.MarkerView
        style={{
          position: 'relative',
        }}
        coordinate={cordianate}
        allowOverlapWithPuck={true}
      >
        <View
          style={{
            height: Spacing.SPACING_199,
            borderRadius: 999,
            width: Spacing.SPACING_199,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.mapCircleIn2,
          }}
        >
          <View
            style={{
              height: Spacing.SPACING_62,
              borderRadius: 999,
              width: Spacing.SPACING_62,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.mapCircleIn,
            }}
          >
            <View
              style={{
                height: Spacing.SPACING_30,
                width: Spacing.SPACING_30,
                backgroundColor: colors.mapMark,
                borderRadius: 999,
                borderWidth: Spacing.SPACING_2,
                borderColor: 'white',
                position: 'relative',
                overflow: 'visible',
              }}
            ></View>
          </View>
        </View>
      </MapboxGL.MarkerView>
      <MapboxGL.MarkerView
        coordinate={[desLng!, desLat!]}
        allowOverlapWithPuck={true}
      >
        <View
          style={{
            height: Spacing.SPACING_199,
            borderRadius: 999,
            width: Spacing.SPACING_199,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.mapCircleIn2,
          }}
        >
          <View
            style={{
              height: Spacing.SPACING_62,
              borderRadius: 999,
              width: Spacing.SPACING_62,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.mapCircleIn,
            }}
          >
            <View
              style={{
                height: Spacing.SPACING_30,
                width: Spacing.SPACING_30,
                backgroundColor: colors.mapMark,
                borderRadius: 999,
                borderWidth: Spacing.SPACING_2,
                borderColor: 'white',
              }}
            ></View>
          </View>
        </View>
      </MapboxGL.MarkerView>
      <MapboxGL.Camera
        animationDuration={300}
        bounds={
          {
            ne: [Math.max(long!, desLng!), Math.max(lat!, desLat!)],
            sw: [Math.min(long!, desLng!), Math.min(lat!, desLat!)],
            paddingBottom: Spacing.SPACING_300,
          } as any
        }
        zoomLevel={16} // Mức thu phóng của bản đồ
        centerCoordinate={cordianate}
      />
    </MapboxGL.MapView>
  );
});

export default LazyMap;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#1D1D1D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(68, 154, 235, 1)',
  },
  small: {
    backgroundColor: 'blue',
    height: ANNOTATION_SIZE,
    justifyContent: 'center',
    width: ANNOTATION_SIZE,
    flex: 1,
  },
  large: {
    borderColor: 'blue',
    backgroundColor: 'rgba(129,175,111,0.49)',
    borderWidth: StyleSheet.hairlineWidth,
    height: ANNOTATION_SIZE * 2,
    justifyContent: 'center',
    width: ANNOTATION_SIZE * 2,
    borderRadius: 999,
    flex: 1,
  },
  text: {
    position: 'absolute',
    fontSize: 10,
  },
  matchParent: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
});
