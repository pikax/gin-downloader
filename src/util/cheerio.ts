export const sanitizeChildren = (children: CheerioElement[]) => children.filter(x => x.type !== "text");
