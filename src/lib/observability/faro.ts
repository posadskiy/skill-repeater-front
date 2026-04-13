import { matchRoutes } from 'react-router-dom';
import {
  ReactIntegration,
  createReactRouterV6DataOptions,
  faro,
  getWebInstrumentations,
  initializeFaro,
} from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import packageJson from '../../../package.json';

/** Must match Grafana Cloud → Frontend → this app’s name. */
const FARO_APP_NAME = 'repeaty';

/** Grafana Frontend Observability collector for app `repeaty` (not a secret). */
const FARO_COLLECT_URL =
  'https://faro-collector-prod-eu-west-2.grafana.net/collect/606c55397701b630ff5d964154a8629c';

/**
 * Initialise Grafana Faro RUM. Call before React renders (see main.tsx).
 * Only runs in production builds so local `vite dev` does not send RUM.
 */
export function initFaro(): void {
  if (!import.meta.env.PROD) {
    return;
  }

  initializeFaro({
    url: FARO_COLLECT_URL,
    app: {
      name: FARO_APP_NAME,
      version: packageJson.version,
      environment: import.meta.env.MODE,
    },
    sessionTracking: {
      samplingRate: 1.0,
    },
    instrumentations: [
      ...getWebInstrumentations({
        captureConsole: true,
        enablePerformanceInstrumentation: true,
      }),
      new TracingInstrumentation(),
      new ReactIntegration({
        router: createReactRouterV6DataOptions({
          matchRoutes,
        }),
      }),
    ],
  });
}

export { faro };
