
# Changelog

## [1.0.1] - 2026-07-10

### Added
- Добавлена поддержка мульти-запросов (multi-queries) в `RQWrapper`
  - Компонент теперь принимает объект с конфигурациями `useQuery` через проп `queries`
  - Добавлен тип `BasedUseQueryHookConfigurations<T>` для типизации объекта с конфигурациями
  - Добавлен тип `BasedUseQueryHookResultInObject<T>` для типизации результатов запросов
  - Добавлен тип `BasedUseQueryHookResultForObjectMethods<T>` для безопасной работы с `Object.values`/`Object.entries`

### Improved
- Улучшена типизация данных нескольких запросов:
  - `QueriesData<U>` - тип для данных из нескольких запросов
  - `NonNullableQueriesData<U>` - тип для гарантированно не-null данных после проверки
  - `QueryDataTypes<T>` - вспомогательный тип для извлечения типов данных
- Добавлена утилита `useQueriesStages` для отслеживания состояний всех запросов
- Улучшена функция `isNonNullableQueriesData` для проверки всех запросов в объекте

### Fixed
- Исправлена проблема с резолвингом `react/jsx-runtime` при использовании `npm link`
- Исправлена типизация `children` функции для корректной работы с несколькими запросами

### Example
```typescript
// Теперь можно передавать несколько конфигураций useQuery:
<RQWrapper
  queries={{
    user: { queryKey: ['user', id], queryFn: fetchUser },
    posts: { queryKey: ['posts', id], queryFn: fetchPosts },
    comments: { queryKey: ['comments', id], queryFn: fetchComments }
  }}
  loader={<Spinner />}
  error={<Error />}
>
  {({ user, posts, comments }) => (
    <Dashboard user={user} posts={posts} comments={comments} />
  )}
</RQWrapper>