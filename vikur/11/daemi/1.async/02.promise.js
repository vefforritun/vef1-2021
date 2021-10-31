const fifteen = Promise.resolve(15);
fifteen.then((value) => console.log(`Got ${value}`));
// → Got 15

setTimeout(() => {
  fifteen.then((value) => console.log('Sama svar, sekúndu seinna', value));
}, 1000);
