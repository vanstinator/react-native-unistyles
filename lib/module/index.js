"use strict";

import React from 'react';
const [majorReactVersions] = React.version.split('.').map(Number.parseInt);
if (majorReactVersions === undefined || majorReactVersions < 19) {
  throw new Error('Unistyles 🦄: To enable full Fabric power you need to use React 19.0.0 or higher');
}
export { StyleSheet, UnistylesRuntime, StatusBar, NavigationBar } from './specs';
export { mq } from './mq';
export { withUnistyles, useUnistyles, createUnistylesElement } from './core';
export { Display, Hide, ScopedTheme, ContainerQuery } from './components';
export { useContainerDimensions } from './context/ContainerQueryContext';
export { useServerUnistyles, hydrateServerUnistyles, getServerUnistyles, resetServerUnistyles } from './server';
//# sourceMappingURL=index.js.map