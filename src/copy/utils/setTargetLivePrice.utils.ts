import { ITicker } from 'src/exchanges/bybit/websockets/response/ticker.interface';
import { Copy } from '../copy.entity';

export function setTargetLivePrice(copies: Copy[], ticker?: ITicker): Copy[] {
  if (ticker?.markPrice) {
    return [
      ...copies.map((copy) => {
        if (copy.symbol == ticker?.symbol) {
          copy.targetPosition.livePrice = ticker.markPrice;
        }
        return copy;
      }),
    ];
  }
  return copies;
}
