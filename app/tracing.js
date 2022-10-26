/*  Copyright (C) 2022 The Fluent Bit authors
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

'use strict';

const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const {
  diag,
  trace,
  context,
  DiagConsoleLogger,
  DiagLogLevel,
} = require('@opentelemetry/api');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const exporter = new OTLPTraceExporter({
	url: "http://fluentbit:8080/v1/traces"
});

const provider = new BasicTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'basic-service',
  }),
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

const tracer = trace.getTracer('example-otlp-exporter-node');

// Create a span
setInterval(() => {
  const parentSpan = tracer.startSpan('main');
  for (let i = 0; i < 10; i += 1) {
    doWork(parentSpan);
  }
  parentSpan.end();
}, 5000);

//exporter.shutdown();

function doWork(parent) {
  // Start a child span
  const ctx = trace.setSpan(context.active(), parent);
  const span = tracer.startSpan('doWork', undefined, ctx);

  // mock random work.
  for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
    // empty
  }
  // Set attributes
  span.setAttribute('key', 'value');

  // Annotate our span to capture metadata about our operation
  span.addEvent('invoking doWork');

  span.end();
}
