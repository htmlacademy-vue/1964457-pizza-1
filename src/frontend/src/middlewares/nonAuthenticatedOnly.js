export default function nonAuthenticatedOnly({ next, store, nextMiddleware }) {
  if (store.state.Auth.isAuthenticated) {
    next("/");
  }
  return nextMiddleware();
}
