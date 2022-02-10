export const parseArguments = (args: string[], length: number): void => {
  if (args.length < length) throw new Error('Not enough arguments');
  if (args.length > length) throw new Error('Too many arguments');

  const validArgs = args.slice(2).map((arg) => isNaN(+arg));

  if (validArgs.includes(true)) {
    throw new Error('Provided values were not numbers!');
  }
};
