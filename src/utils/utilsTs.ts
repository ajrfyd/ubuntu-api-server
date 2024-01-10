// ['tag:id', 'tag:id'] => [{ id: "", label: ""}]
// const makeTagFormHandler = (tagArr: string[]): TagType[] => go(
//   map((tagStr: string) => tagStr.split(":"), tagArr),
//   (arr: string[][]) => map(([k, v]: string[]) => ({ id: v, label: k }), arr)
// );