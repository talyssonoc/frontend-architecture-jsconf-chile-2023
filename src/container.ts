import { makeStatefulUseCaseHook } from './_lib/useCases/makeUseCaseHook';
import { reduxStore } from './readModel/redux/reduxStore';
import { useEntries, useEntry } from './readModel/entry';
import { makeCreateEntry } from './app/useCases/createEntry';
import { makeUpdateEntry } from './app/useCases/updateEntry';
import { makeRTKEntryRepository } from './infra/RTKEntryRepository';

const entryRepository = makeRTKEntryRepository({ reduxStore });

const createEntry = makeCreateEntry({ entryRepository });
const updateEntry = makeUpdateEntry({ entryRepository });

const useCreateEntry = makeStatefulUseCaseHook(createEntry);
const useUpdateEntry = makeStatefulUseCaseHook(updateEntry);

const container = {
  reduxStore,
  useCreateEntry,
  useUpdateEntry,
  useEntries,
  useEntry,
};

type Container = typeof container;

export { container };
export type { Container };
