import type { ChartConfig } from "../components/Charts/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (!isRecord(payload)) {
    return undefined;
  }

  const payloadPayload = isRecord(payload.payload)
    ? payload.payload
    : undefined;

  const configLabelKey =
    typeof payload[key] === "string"
      ? payload[key]
      : payloadPayload && typeof payloadPayload[key] === "string"
        ? payloadPayload[key]
        : key;

  return (
    config[configLabelKey as keyof ChartConfig] ??
    config[key as keyof ChartConfig]
  );
}
