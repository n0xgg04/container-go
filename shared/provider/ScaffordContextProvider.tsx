import * as React from 'react';
import { createContext, useContext } from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

type Props = {};
type ScaffoldData = {
  offsetY: SharedValue<number>;
};

const ScaffoldContext = createContext<ScaffoldData>({} as ScaffoldData);

export function ScaffoldContextProvider({
  children,
}: React.PropsWithChildren<Props>) {
  const offsetY = useSharedValue(0);
  return (
    <ScaffoldContext.Provider value={{ offsetY }}>
      {children}
    </ScaffoldContext.Provider>
  );
}

export function useScaffoldContext() {
  return useContext(ScaffoldContext);
}
