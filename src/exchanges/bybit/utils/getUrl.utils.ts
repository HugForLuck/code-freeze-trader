export function getBybitHttpUrl(isLive = 'false'): string {
  const urlLive = 'https://api.bybit.com';
  const urlDemo = 'https://api-demo.bybit.com';
  return isLive == 'true' ? urlLive : urlDemo;
}

export function getBybitWSUrl(isLive = 'false'): string {
  const urlLive = 'wss://stream.bybit.com';
  const urlDemo = 'wss://stream-demo.bybit.com';
  return isLive == 'true' ? urlLive : urlDemo;
}
