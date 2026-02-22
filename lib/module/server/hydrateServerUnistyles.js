"use strict";

import * as unistyles from '../web/services';
import { error, isServer } from '../web/utils';
export const hydrateServerUnistyles = () => {
  if (isServer()) {
    throw error('Server styles should only be hydrated on the client');
  }
  unistyles.services.registry.css.hydrate(window.__UNISTYLES_STATE__);
  document.querySelector('#unistyles-script')?.remove();
};
//# sourceMappingURL=hydrateServerUnistyles.js.map