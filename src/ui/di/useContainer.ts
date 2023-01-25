import { useContext } from 'react';
import { ContainerContext } from './ContainerContext';

const useContainer = () => {
  const container = useContext(ContainerContext);

  if (!container) {
    throw Error('You used useContainer outside a ContainerProvider');
  }

  return container;
};

export { useContainer };
