import type { JSX } from "react";

interface GenericLabelCardProps {
  label: string;
  onRemove: () => void;
}

const GenericLabelCard = ({
  label,
  onRemove,
}: GenericLabelCardProps): JSX.Element => {
  return (
    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm flex items-center">
      {label}
      <button
        onClick={onRemove}
        className="ml-2 text-black-600 hover:text-black-800 cursor-pointer"
      >
        ×
      </button>
    </span>
  );
};

export default GenericLabelCard;
