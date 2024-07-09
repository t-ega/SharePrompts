import Skeleton from "react-loading-skeleton";

const PromptCardSkeleton = () => {
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Skeleton containerClassName="flex-1" height={200} />
        </div>
      </div>
    </div>
  );
};

export default PromptCardSkeleton;
