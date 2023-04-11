import axios from "axios";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUserFavorite {
  listingId: string;
  currentUser: SafeUser | null | undefined;
}

const useFavorites = ({ listingId, currentUser }: IUserFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return loginModal.open();

      try {
        const requestUrl = `/api/favorites/${listingId}`;
        let request = () => axios.post(requestUrl);

        if (hasFavorited) {
          request = () => axios.delete(requestUrl);
        }

        await request();
        router.refresh();
        toast.success(hasFavorited ? "Removed!" : "Added to your favorites");
      } catch (error: any) {
        toast.error("Something went wrong");
        console.error(error);
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorites;
