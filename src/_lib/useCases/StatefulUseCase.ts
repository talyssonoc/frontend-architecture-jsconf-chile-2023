type StatefulUseCase<PublicInterface, State, Args = void> = {
  initialState: (args: Args) => State;
  interface: (context: Context<State, Args>) => PublicInterface;
};

type Context<State, Args> = {
  state: State;
  setState: SetState<State>;
  args: Args;
};

type SetState<State> = (u: StateSetter<State>) => void;

type StateSetter<State> = State | ((old: State) => State);

export type { StatefulUseCase, Context };
