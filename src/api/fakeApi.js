export const getData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch('/data.json')
        .then(res => res.json())
        .then(json => resolve(json));
    }, 2000); 
  });
};
