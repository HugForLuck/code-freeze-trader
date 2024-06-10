import { SYMBOL } from 'src/shared/enums/symbol.enum';

export const TICKER_SYMBOLS = Object.keys(SYMBOL).map((s) => 'tickers.' + s);
