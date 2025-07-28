export function logApiError(
  message: string,
  endpoint?: string,
  status?: number,
): void {
  console.error("[API Error]", {
    message,
    endpoint,
    status,
    timestamp: new Date().toISOString(),
  });
}
