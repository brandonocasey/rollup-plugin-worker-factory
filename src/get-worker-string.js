const getWorkerString = function(fn) {
  return fn.toString().replace(/^function.+?{/, '').slice(0, -1);
};

export default getWorkerString;
