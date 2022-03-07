export default async function auth({ store, nextMiddleware }) {
  if (!store.state.Auth.isAuthenticated) {
    const token = store.$jwt.getToken();
    if (token) {
      store.$api.auth.setAuthHeader();
      await store.dispatch("Auth/getMe");
    }
  }
  return nextMiddleware();
}
