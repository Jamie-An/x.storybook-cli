const st = (fn) => {
  setTimeout(() => {
    console.log(11);
    fn();
  }, 1000);
};

const fn = () => {
  return new Promise((resolve, reject) => {
    if (err) {
      resolve();
    } else {
      reject();
    }
  });
};

fn().then();
