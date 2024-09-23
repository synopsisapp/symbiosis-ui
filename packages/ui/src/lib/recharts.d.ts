import 'recharts';

declare module 'recharts' {
  import { Props as OriginalCellProps } from 'recharts/types/component/Cell';

  // Cell accepts radius as a number[] but the type was incorrect
  // https://github.com/recharts/recharts/issues/3325
  export interface ExtendedCellProps extends Omit<OriginalCellProps, 'radius'> {
    radius?: number | [number, number, number, number] | string;
  }

  export const Cell: React.FunctionComponent<ExtendedCellProps>;
}
