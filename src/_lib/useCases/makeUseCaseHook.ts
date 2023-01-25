import { useState, useMemo } from 'react';
import { StatefulUseCase, Context } from './StatefulUseCase';

type StatefulUseCaseHook<PI, A> = (...args: [A]) => PI;

const makeStatefulUseCaseHook = <PI, S, A>(statefulUseCase: StatefulUseCase<PI, S, A>): StatefulUseCaseHook<PI, A> => {
  return (args) => {
    const [state, setState] = useState(() => statefulUseCase.initialState(args));

    return useMemo(() => {
      const context: Context<S, A> = {
        state,
        setState,
        args,
      };

      return statefulUseCase.interface(context);
    }, [state, setState, args]);
  };
};

export { makeStatefulUseCaseHook };
