import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { useContainer } from '../di/useContainer';

type Props = {
  children: ReactNode;
};

const ReduxProvider = ({ children }: Props) => {
  const { reduxStore } = useContainer();

  return <Provider store={reduxStore}>{children}</Provider>;
};

export { ReduxProvider };
