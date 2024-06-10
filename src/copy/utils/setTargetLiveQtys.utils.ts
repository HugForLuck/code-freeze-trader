import { Copy } from '../copy.entity';
import { IPosition } from '../position.interface';

export function setTargetLiveQtys(
  copies: Copy[],
  positions?: IPosition[],
): Copy[] {
  if (positions == undefined || positions?.length == 0) return copies;

  for (const p of positions) {
    copies.forEach((copy) => {
      if (copy.symbol == p.symbol && copy.dir == p.dir) {
        copy.targetPosition.liveQty = p.liveQty ?? 0;
      }
      return copy;
    });
  }
  return [...copies];
}
