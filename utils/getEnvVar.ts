export default function getEnvVar(v: string): string {
  const ret = process.env[v];
  if (ret === undefined) {
    throw new Error("process.env." + v + " is undefined!");
  }
  return ret;
}
