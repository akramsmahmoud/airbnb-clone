"use client";

import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";
interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try adjusting your search or filter to find what you're looking for.",
  showReset,
}) => {
  const Router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-2">
      <Image
        src="/images/empty-state.png"
        alt="Empty State"
        width={300}
        height={300}
      />
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            onClick={() => Router.push("/")}
            label="Remove all filters"
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
