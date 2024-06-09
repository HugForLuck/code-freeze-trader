import { SIDE } from 'src/exchanges/api/side.enum';
import { DIR } from 'src/shared/enums/dir.enum';
import { IPositionInfo } from '../responses/positionInfoResponse.interface';
import { TargetPosition } from 'src/copy/targetPositions/targetPosition.entity';
import { ITargetPosition } from 'src/copy/targetPositions/targetPosition.interface';
import { TARGET_EXCHANGE } from 'src/copy/targetExchange.enum';

export function mapToTargetPositions(
  positions: IPositionInfo[],
): ITargetPosition[] {
  return positions.map(mapToTargetPosition);
}

function mapToTargetPosition(position: IPositionInfo): ITargetPosition {
  const dir = position.side == SIDE.BUY ? DIR.LONG : DIR.SHORT;
  const liveQty = +position.size;
  return new TargetPosition(
    position.symbol,
    dir,
    TARGET_EXCHANGE.BYBIT,
    liveQty,
  );
}
