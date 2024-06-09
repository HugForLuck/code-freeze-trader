import { ITicker } from 'src/exchanges/bybit/websockets/response/ticker.interface';
import { Copy } from '../copy.entity';

export function setTargetLivePrice(copies: Copy[], ticker?: ITicker) {
  if (!ticker) return;
  copies.forEach((copy) => {
    if (copy.symbol == ticker?.symbol) {
      copy.targetPosition.livePrice = +ticker.markPrice;
      console.log(copy.targetPosition.livePrice);
    }
  });
}
