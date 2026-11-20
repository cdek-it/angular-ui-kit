/** Единая точка вывода CLI-скриптов. */
export const log = (...args) => process.stdout.write(`${args.join(' ')}\n`);
