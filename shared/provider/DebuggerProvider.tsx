import * as React from 'react';
import { createContext, useContext, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import DebuggerSheet from '@/shared/components/ui/debugger/DebuggerSheet';
import { useAxiosDebugger } from '@/shared/hooks/useAxiosDebugger';

const DebuggerContext = createContext<{
  BottomSheetModalRef?: React.RefObject<BottomSheetModal>;
}>({
  BottomSheetModalRef: undefined,
});

export default function DebuggerProvider({
  children,
}: React.PropsWithChildren) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  useAxiosDebugger();

  return (
    <DebuggerContext.Provider
      value={{
        BottomSheetModalRef: bottomSheetModalRef,
      }}
    >
      <DebuggerSheet />
      {children}
    </DebuggerContext.Provider>
  );
}

export const useDebuggerContext = () => useContext(DebuggerContext);
