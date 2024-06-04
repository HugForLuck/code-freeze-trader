export function getBybitUrl(isLive = 'false'): string {
  const urlLive = 'https://api.bybit.com';
  const urlDemo = 'https://api-demo.bybit.com';
  return isLive == 'true' ? urlLive : urlDemo;
}
