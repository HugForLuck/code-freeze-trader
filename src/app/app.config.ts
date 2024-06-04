import { getBybitUrl } from 'src/exchanges/bybit/utils/getUrl.utils';

export enum APP {
  RUN = 'RUN',
}

export const CONFIG = () => ({
  BYBIT: {
    KEY: process.env.BYBIT_KEY || '',
    SECRET: process.env.BYBIT_SECRET || '',
    IS_LIVE: process.env.BYBIT_IS_LIVE || false,
    URL: getBybitUrl(process.env.BYBIT_IS_LIVE),
  },
});
