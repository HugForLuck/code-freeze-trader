import { OriginPosition } from '../originPosition.entity';

export function isBetterOpenPrice(pos?: OriginPosition, livePrice = '0') {
  if (!pos || livePrice == '0') return false;
  if (pos.isLong) {
    return livePrice < pos.traderBestPrice;
  } else {
    return livePrice > pos.traderBestPrice;
  }
}
