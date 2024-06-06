import { ECopyPosition } from 'src/copy/copyPosition.entity';
import { SIDE } from 'src/exchanges/api/side.enum';
import { DIR } from 'src/shared/enums/dir.enum';
import { IPositionInfo } from '../responses/positionInfoResponse.interface';

export function mapToCopyPositions(
  positions: IPositionInfo[],
): ECopyPosition[] {
  return positions.map(mapToCopyPosition);
}

function mapToCopyPosition(position: IPositionInfo): ECopyPosition {
  const p = new ECopyPosition();
  p.symbol = position.symbol;
  p.dir = position.side == SIDE.BUY ? DIR.LONG : DIR.SHORT;
  p.liveQty = +position.size;
  return p;
}
