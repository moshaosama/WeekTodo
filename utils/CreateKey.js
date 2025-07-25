const CreateKeyRedis = (...args) => {
  return `bits:${args.join(":")}`;
};

export const Days_Key = (id) => CreateKeyRedis("days", id);
