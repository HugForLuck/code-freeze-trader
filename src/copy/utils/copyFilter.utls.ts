import { Copy } from '../copy.entity';

export function getLiveCopies(copies: Copy[]) {
  return copies.filter(copyIsLive);
}

function copyIsLive(copy: Copy) {
  return copy?.targetPosition?.liveQty ?? 0 > 0;
}

export function getOpenCopies(copies: Copy[]) {
  return copies.filter(copyIsOpen);
}

function copyIsOpen(copy: Copy) {
  return (
    copy.targetPosition == undefined || copy.targetPosition.liveQty == null
  );
}
