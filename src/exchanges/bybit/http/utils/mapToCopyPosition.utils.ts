import { SIDE } from 'src/exchanges/api/side.enum';
import { DIR } from 'src/shared/enums/dir.enum';
import { IPositionInfo } from '../responses/positionInfoResponse.interface';
import { TargetPosition } from 'src/copy/targetPositions/targetPosition.entity';
import { ITargetPosition } from 'src/copy/targetPositions/targetPosition.interface';

export function mapToCopyPositions(
  positions: IPositionInfo[],
): ITargetPosition[] {
  return positions.map(mapToCopyPosition);
}

function mapToCopyPosition(position: IPositionInfo): ITargetPosition {
  const p = new TargetPosition();
  p.symbol = position.symbol;
  p.dir = position.side == SIDE.BUY ? DIR.LONG : DIR.SHORT;
  p.liveQty = +position.size;
  return p;
}
