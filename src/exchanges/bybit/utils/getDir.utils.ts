import { SIDE } from 'src/exchanges/api/side.enum';
import { DIR } from 'src/shared/enums/dir.enum';

export function getDir(side: string) {
  return side == SIDE.BUY ? DIR.LONG : DIR.SHORT;
}
