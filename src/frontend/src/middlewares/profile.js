export default async function profile({ store, nextMiddleware }) {
  if (!store.state.Profile.addresses) {
    await store.dispatch("Profile/initAddresses");
  }
  return nextMiddleware();
}
