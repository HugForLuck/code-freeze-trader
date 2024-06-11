import { Copy } from '../copy.entity';
import { TargetPosition } from '../target/targetPosition.entity';

export function setTargetLiveQtys(
  copies: Copy[],
  positions?: TargetPosition[],
): Copy[] {
  if (positions == undefined || positions?.length == 0) return copies;

  for (const p of positions) {
    copies.forEach((copy) => {
      if (copy.symbol == p.symbol && copy.dir == p.dir) {
        copy.targetPosition.liveQty = p.liveQty;
      }
      return copy;
    });
  }
  return [...copies];
}
