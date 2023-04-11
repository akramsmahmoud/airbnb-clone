import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="unauthorized" subtitle="Please login!" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips yet!"
          subtitle="Please make a reservation!"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
