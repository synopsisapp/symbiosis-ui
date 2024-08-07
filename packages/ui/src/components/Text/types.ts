import z from 'zod';



export const TextVariant = z.enum([
  'body-small-200',
  'body-small-100',
  'body-base',
  'body-large-100',
  'body-large-200',
  'title-small-100',
  'title-base',
  'title-large-100',
]);

export type TextVariant = z.infer<typeof TextVariant>;

export const TextWeight = z.enum([
  'thin-200',
  'thin-100',
  'base',
  'bold-100',
  'bold-200',
]);

export type TextWeight = z.infer<typeof TextWeight>;

export const TextRenderAs = z.enum([
  'span',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'a',
]);

export type TextRenderAs = z.infer<typeof TextRenderAs>;

export type TextProps = {
  variant?: TextVariant;
  weight?: TextWeight;
  renderAs?: TextRenderAs;
  noTranslations?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};
