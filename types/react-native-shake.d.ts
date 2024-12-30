declare module 'react-native-shake' {
  declare const _default: {
    addListener: (
      callback: () => void | undefined
    ) => import('react-native').EmitterSubscription;
    removeAllListeners: () => void;
  };
  export default _default;
}
