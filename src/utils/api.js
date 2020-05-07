// fake API
export const delay = (ms) => {
  return new Promise((resolve) => {
    let id = setTimeout(() => resolve(id), ms);
  });
};
