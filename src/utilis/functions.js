export const generateCustomId = (prefix, length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let customId = prefix;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    customId += characters.charAt(randomIndex);
  }

  return customId;
};

export const excludeEmptyStrings = (obj) => {
  let result = {};
  for (let [key, value] of Object.entries(obj)) {
    if (value !== "") {
      result[key] = value;
    }
  }
  return result;
};

export const todaysDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const the_date = `${year}/${month}/${day}`;
  return the_date;
};
