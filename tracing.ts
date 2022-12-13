import dotenv from 'dotenv'

dotenv.config()

import * as opentelemetry from '@opentelemetry/sdk-node'
import { HoneycombSDK } from '@honeycombio/opentelemetry-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api'

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO)
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG)

const sdk: opentelemetry.NodeSDK = new HoneycombSDK({
  apiKey: process.env.HONEYCOMB_API_KEY,
  serviceName: process.env.OTEL_SERVICE_NAME,
  traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
  instrumentations: [getNodeAutoInstrumentations()],
})

sdk.start()
