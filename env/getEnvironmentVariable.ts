const getEnvironmentVariable = (name: string) => {
  const environmentVariable = process.env[name];
  if (!environmentVariable) {
    throw new Error(`Cannot find environment variable: ${name}`);
  }
  return environmentVariable;
};

export default getEnvironmentVariable;
