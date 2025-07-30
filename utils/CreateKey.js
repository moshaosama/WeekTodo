const CreateKeyRedis = (...args) => {
  return `bits:${args.join(":")}`;
};

export const Days_Key = (id) => CreateKeyRedis("days", id);
export const Days_Details_Key = () => CreateKeyRedis("days-details");
export const User_Key = (id) => CreateKeyRedis("user", id);
export const Task_key = (id) => CreateKeyRedis("tasks", id);
