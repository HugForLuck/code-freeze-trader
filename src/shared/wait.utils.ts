export function sleep(isDelay = true, ms = 5000) {
  ms = isDelay ? ms : 0;
  return setTimeout(() => {}, ms);
}

export function asleep(isDelay = true, ms = 5000) {
  ms = isDelay ? ms : 0;
  return new Promise((resolve) => setTimeout(resolve, ms));
}
