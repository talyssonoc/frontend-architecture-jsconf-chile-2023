import { DateTime } from 'luxon';

namespace Entry {
  type Entry = {
    id: number;
    title: string;
    content: string;
    date: DateTime;
  };

  const INTENT_SYMBOL = Symbol('EntryIntent');

  type EntryIntent = {
    id?: number;
    title: string;
    content: string;
    date: DateTime;
    [INTENT_SYMBOL]: true;
  };

  type AnyEntry = Entry | EntryIntent;

  export const createEmptyIntent = (): EntryIntent => ({
    title: '',
    content: '',
    date: DateTime.now(),
    [INTENT_SYMBOL]: true,
  });

  export const createIntentFrom = (entry: Entry): EntryIntent => ({
    id: entry.id,
    title: entry.title,
    content: entry.content,
    date: entry.date,
    [INTENT_SYMBOL]: true,
  });

  type EntryProps = {
    id: number;
    title: string;
    content: string;
    date: DateTime;
  };

  export const create = (entryProps: EntryProps): Entry => ({
    id: entryProps.id,
    title: entryProps.title,
    content: entryProps.content,
    date: entryProps.date,
  });

  export const isIntent = (e: AnyEntry): e is EntryIntent => INTENT_SYMBOL in e;

  export const changeIntentTitle = (intent: EntryIntent, newTitle: string): EntryIntent => ({
    ...intent,
    title: newTitle,
  });

  export const changeIntentContent = (intent: EntryIntent, newContent: string): EntryIntent => ({
    ...intent,
    content: newContent,
  });

  export const changeIntentDate = (intent: EntryIntent, newDate: DateTime): EntryIntent => {
    if ('id' in intent) {
      return intent;
    }

    return {
      ...intent,
      date: newDate,
    };
  };

  const MIN_TITLE_LENGTH = 5;
  const hasValidTitle = (intent: EntryIntent) => intent.title.length > MIN_TITLE_LENGTH;

  const MIN_CONTENT_LENGTH = 60;
  const hasValidContent = (intent: EntryIntent) => intent.content.length > MIN_CONTENT_LENGTH;

  const hasValidDate = (intent: EntryIntent) => {
    if ('id' in intent) {
      return true;
    }

    const today = DateTime.now().endOf('day');

    return intent.date.endOf('day') <= today;
  };

  export const validateIntent = (intent: EntryIntent) => ({
    isValid: hasValidTitle(intent) && hasValidContent(intent) && hasValidDate(intent),
    errors: {
      title: hasValidTitle(intent) ? null : `Title should be longer than ${MIN_TITLE_LENGTH} characters`,
      content: hasValidContent(intent) ? null : `Content should be longer than ${MIN_CONTENT_LENGTH} characters`,
      date: hasValidDate(intent) ? null : 'Date should be current day or in the past',
    },
  });

  export const compare = (entryA: Entry, entryB: Entry): number => entryA.date.toMillis() - entryB.date.toMillis();

  export type Type = Entry;
  export type Intent = EntryIntent;
  export type Any = AnyEntry;
}

export { Entry };
