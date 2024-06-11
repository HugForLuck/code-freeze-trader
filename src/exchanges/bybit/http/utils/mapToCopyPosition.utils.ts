import { IPositionInfo } from '../responses/positionInfoResponse.interface';
import { TargetPosition } from 'src/copy/target/targetPosition.entity';
import { ITargetPosition } from 'src/copy/target/targetPosition.interface';
import { getDir } from '../../utils/getDir.utils';
import { TARGET_EXCHANGE } from 'src/copy/target/targetExchange.enum';

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
