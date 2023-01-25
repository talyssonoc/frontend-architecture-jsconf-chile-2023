import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DateTime } from 'luxon';
import { Entry } from 'src/domain/Entry';

type ApiEntry = {
  id: number;
  title: string;
  text: string;
  date: string;
};

const mapApiToDomain = (apiEntry: ApiEntry): Entry.Type =>
  Entry.create({
    id: apiEntry.id,
    title: apiEntry.title,
    content: apiEntry.text,
    date: DateTime.fromISO(apiEntry.date),
  });

const mapAnyToApi = (intent: Entry.Any): Omit<ApiEntry, 'id'> => ({
  title: intent.title,
  text: intent.content,
  date: intent.date.toISO(),
});

const createTag = (id: string | number) => ({ type: 'Entry' as const, id: String(id) });

const entryApiSlice = createApi({
  reducerPath: 'entries',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL! }),
  tagTypes: ['Entry'],
  endpoints: (builder) => ({
    getAllEntries: builder.query<Entry.Type[], void>({
      query: () => '/',
      transformResponse: (apiEntries: ApiEntry[]) => apiEntries.map(mapApiToDomain).sort(Entry.compare),
      providesTags: (apiEntries) =>
        apiEntries ? [...apiEntries.map(({ id }) => createTag(id)), createTag('LIST')] : [createTag('LIST')],
    }),

    getEntryById: builder.query<Entry.Type, number>({
      query: (id) => `/${id}`,
      transformResponse: mapApiToDomain,
      providesTags: (apiEntry) => (apiEntry ? [createTag(apiEntry.id)] : []),
    }),

    addEntry: builder.mutation<Entry.Type, Entry.Intent>({
      query: (entryIntent) => ({
        url: '/',
        method: 'POST',
        body: mapAnyToApi(entryIntent),
      }),
      transformResponse: mapApiToDomain,
      invalidatesTags: [createTag('LIST')],
    }),

    updateEntry: builder.mutation<Entry.Type, Entry.Any>({
      query: (entry) => ({
        url: `${entry.id}`,
        method: 'PUT',
        body: mapAnyToApi(entry),
      }),
      transformResponse: mapApiToDomain,
      invalidatesTags: (entry) => (entry ? [createTag(entry?.id)] : []),
    }),
  }),
});

const { useGetAllEntriesQuery: useEntries, useGetEntryByIdQuery: useEntry } = entryApiSlice;

export { entryApiSlice, useEntries, useEntry };
