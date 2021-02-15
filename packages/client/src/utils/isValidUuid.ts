const uuidv4Regex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

export const isValidUuid = (id: string | undefined) => {
  if (!id) {
    return false;
  }

  return uuidv4Regex.test(id);
};
