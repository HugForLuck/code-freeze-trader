export enum APP {
  RUN = 'RUN',
}

export const CONFIG = () => ({
  BYBIT: {
    KEY: process.env.BYBIT_KEY || '',
    SECRET: process.env.BYBIT_SECRET || '',
  },
});
