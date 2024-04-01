// ['tag:id', 'tag:id'] => [{ id: "", label: ""}]
// const makeTagFormHandler = (tagArr: string[]): TagType[] => go(
//   map((tagStr: string) => tagStr.split(":"), tagArr),
//   (arr: string[][]) => map(([k, v]: string[]) => ({ id: v, label: k }), arr)
// );

export const makeErr = (name: string, message: string) => {
  const Err = new Error();
  Err.name = name;
  Err.message = message;
  throw Err;
};

export const getToken = (token: string): string[] => token.split(" ");

export const getMaxAgeTime = (now: Date) => {
  let h = now.getHours();
  let m = now.getMinutes();

  h = m > 0 ? 24 - h - 1 : 24 - h;
  m = 60 - m;
  return [h, m];
};
