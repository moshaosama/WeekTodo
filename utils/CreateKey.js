const CreateKeyRedis = (...args) => {
  return `bits:${args.join(":")}`;
};

export const Days_Key = (id) => CreateKeyRedis("days", id);
export const User_Key = (id) => CreateKeyRedis("user", id);
