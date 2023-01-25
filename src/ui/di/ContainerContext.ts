import { createContext } from 'react';
import { Container } from '../../container';

const ContainerContext = createContext<Container | null>(null);

const { Provider: ContainerProvider } = ContainerContext;

export { ContainerContext, ContainerProvider };
