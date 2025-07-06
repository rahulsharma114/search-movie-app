import type { JSX } from "react";

interface GenericListItemsProps<T> {
  options: T[];
  loading: boolean;
  getKey: (item: T) => string | number;
  getLabel: (item: T) => string;
  onSelect: (item: T) => void;
}

const GenericListItems = <T,>({
  options,
  loading,
  getKey,
  getLabel,
  onSelect,
}: GenericListItemsProps<T>): JSX.Element => {
  return (
    <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-md shadow mt-1 max-h-60 overflow-y-auto z-10">
      {loading ? (
        <li className="p-2 text-gray-500 italic">Loading...</li>
      ) : options.length ? (
        options.map((item) => (
          <li
            key={getKey(item)}
            onClick={() => onSelect(item)}
            className="p-2 text-sm hover:bg-blue-50 cursor-pointer"
          >
            {getLabel(item)}
          </li>
        ))
      ) : (
        <li className="p-2 text-gray-500 italic">No results</li>
      )}
    </ul>
  );
}

export default GenericListItems;