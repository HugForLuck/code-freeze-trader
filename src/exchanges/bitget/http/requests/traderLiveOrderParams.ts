import { SYMBOL } from 'src/shared/enums/symbol.enum';
import { PRODUCT_TYPE } from '../utils/productType.interface';

export interface TraderLiveOrderParams {
  productType: PRODUCT_TYPE;
  traderId: string;
  endTime?: string;
  symbol?: SYMBOL;
}
