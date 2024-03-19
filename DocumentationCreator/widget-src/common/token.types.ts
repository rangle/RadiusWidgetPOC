export type TokenUse = {
  name: string;
  value: string;
  from: string;
};

export const isTokenUse = (o: unknown): o is TokenUse =>
  !!o && typeof o === "object" && "name" in o && "value" in o && "from" in o;

export type ComponentUsage = {
  name: string;
  props: TokenUse[];
  children: ComponentUsage[];
};
