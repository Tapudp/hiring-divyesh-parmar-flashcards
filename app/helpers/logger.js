const logger = (() => {
  const checkIfLogsEnabled = () => {
    if (process.browser) {
      const search = global?.window?.location?.search;
      const enabled = search && new URLSearchParams(search).get('debug') === 'true';

      global.areLogsEnabled = enabled || false;
      return global.areLogsEnabled;
    }

    return false;
  };

  const isDev = process.env.NODE_ENV !== 'production';

  const print = (type, ...messages) => {
    if (typeof global.areLogsEnabled === 'undefined') {
      checkIfLogsEnabled();
    }

    const timeStamp = new Date().toString();

    if (global.areLogsEnabled || isDev) {
      switch (type) {
        case 'info':
          console.info(
            `:: %c ${timeStamp} Flashcard service log ::`,
            'background: blue; color: white;',
            ...messages
          );
          break;
        case 'warn':
          console.warn(
            `:: %c ${timeStamp} Flashcard service log ::`,
            'background: orange; color: white;',
            ...messages
          );
          break;
        case 'error':
          console.error(
            `:: %c ${timeStamp} Flashcard service log ::`,
            'background: red; color: white;',
            ...messages
          );
          break;
        case 'trace':
          console.trace(
            `:: %c ${timeStamp} Flashcard service log ::`,
            'background: grey; color: black;',
            ...messages
          );
          break;
        case 'debug':
        default:
          console.log(
            `:: %c ${timeStamp} Flashcard service log ::`,
            'background: green; color: white;',
            ...messages
          );
      }
    }
  };

  return {
    debug: print.bind(null, 'debug'),
    info: print.bind(null, 'info'),
    warn: print.bind(null, 'warn'),
    error: print.bind(null, 'error'),
    trace: print.bind(null, 'trace'),
  };
})();

export default logger;
