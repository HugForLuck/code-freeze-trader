import { IPositionInfo } from '../responses/positionInfoResponse.interface';
import { TargetPosition } from 'src/copy/targetPositions/targetPosition.entity';
import { ITargetPosition } from 'src/copy/targetPositions/targetPosition.interface';
import { TARGET_EXCHANGE } from 'src/copy/targetExchange.enum';
import { getDir } from '../../utils/getDir.utils';

export function mapToTargetPositions(
  positions: IPositionInfo[],
): ITargetPosition[] {
  return positions.map(mapToTargetPosition);
}

function mapToTargetPosition(position: IPositionInfo): ITargetPosition {
  return new TargetPosition(
    position.symbol,
    getDir(position.side),
    TARGET_EXCHANGE.BYBIT,
    position.size,
  );
}
