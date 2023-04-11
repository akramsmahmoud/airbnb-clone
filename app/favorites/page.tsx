import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";

import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="unauthorized" subtitle="Please login!" />
      </ClientOnly>
    );
  }

  const favorites = await getFavorites();

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No favorites" subtitle="Please add some!" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={favorites} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;
