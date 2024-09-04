import * as React from 'react';

type Props = {
  as?: React.ElementType | string;
  children?: React.ReactNode;
  [key: string]: unknown;
};

export const StopPropagation = ({
  as: Component = 'div',
  children,
  ...props
}: Props) => {
  const onUserAction = React.useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <Component onClick={(e: React.SyntheticEvent) => onUserAction(e)} onKeyDown={(e: React.SyntheticEvent) => onUserAction(e)} {...props}>
      {children}
    </Component>
  );
};

