type data = {
  _id: string;
  title: string;
  ignites: string;
  avatar: string;
  sparkon: string;
  root: string;
};

export const transform: object = (data: data[], root: string) => {
  const nodes: object[] = [];
  const links: object[] = [];

  for (let i = 0; i < data.length; i++) {
    nodes.push({
      id: data[i]._id,
      name: data[i].title,
      title: data[i].title,
      ignites: data[i].ignites,
      avatar: data[i].avatar,
      sparkon: data[i].sparkon,
      size: 1600,
      x: 610,
      y: 325
    });

    if (data[i].root !== "" && data[i]._id !== root) links.push({ source: data[i].root, target: data[i]._id });
  }

  const newdata = { nodes, links };
  return newdata;
};
