export default function authenticatedOnly({ next, store, nextMiddleware }) {
  if (!store.state.Auth.isAuthenticated) {
    next("/login");
  }
  return nextMiddleware();
}
