import GenericListItems from "./listItems";
import GenericLabelCard from "./labelcard";
import type { JSX } from "react";

interface GenericMultiSelectProps<T> {
  query: string;
  options: T[];
  selectedItems: T[];
  onSelect: (item: T) => void;
  onRemove: (key: string | number) => void;
  onQueryChange: (query: string) => void;
  getLabel: (item: T) => string;
  getKey: (item: T) => string | number;
  loading?: boolean;
  placeholder?: string;
}

export default function GenericMultiSelect<T>({
  query,
  options,
  selectedItems,
  onSelect,
  onRemove,
  onQueryChange,
  getLabel,
  getKey,
  loading = false,
  placeholder = "Search...",
}: GenericMultiSelectProps<T>): JSX.Element {
  return (
    <div className="w-full max-w-xl mx-auto mt-6 relative">
      <div className="border border-gray-300 rounded-lg p-3 flex flex-wrap gap-2 bg-white shadow-sm">
        {selectedItems.map((item) => (
          <GenericLabelCard
            key={getKey(item)}
            label={getLabel(item)}
            onRemove={() => onRemove(getKey(item))}
          />
        ))}
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 text-sm outline-none min-w-[150px] p-1"
        />
      </div>

      {query.length >= 2 && (
        <GenericListItems
          options={options}
          loading={loading}
          getKey={getKey}
          getLabel={getLabel}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}
