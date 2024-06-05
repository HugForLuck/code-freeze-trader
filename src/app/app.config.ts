import { getBybitHttpUrl } from 'src/exchanges/bybit/utils/getUrl.utils';

export enum APP {
  RUN = 'RUN',
}

export const CONFIG = () => ({
  BYBIT: {
    KEY: process.env.BYBIT_KEY || '',
    SECRET: process.env.BYBIT_SECRET || '',
    IS_LIVE: process.env.BYBIT_IS_LIVE || false,
    HTTP_URL: getBybitHttpUrl(process.env.BYBIT_IS_LIVE),
  },
  DB: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || 3306,
    DATABASE: process.env.DB_DATABASE || 'db_unknown',
    USERNAME: process.env.DB_USERNAME || 'root',
    PASSWORD: process.env.DB_PASSWORD || 'root',
  },
});
