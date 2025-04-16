export const navigate = (searchParams) => {
  window.history.pushState(
    null,
    '',
    searchParams.size === 0 ? '/' : `?${searchParams}`
  );
};
