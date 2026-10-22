import { registerRootComponent } from 'expo';

// CRITICAL FIX: Prevent Reanimated from auto-initializing
// This must be set BEFORE any other imports that might use Reanimated
// @ts-ignore
global._WORKLET = false;
// @ts-ignore
global._frameTimestamp = null;

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
