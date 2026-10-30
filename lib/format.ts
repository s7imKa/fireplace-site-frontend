export const formatPrice = (value: number) =>
  `${new Intl.NumberFormat("uk-UA").format(value).replace(/ /g, " ")} грн`;

export const cn = (...cls: (string | false | null | undefined)[]) => cls.filter(Boolean).join(" ");
