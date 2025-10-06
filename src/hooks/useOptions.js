import { useMemo } from "react";

export const useOptions = (items) => {
  return useMemo(() => {
    return items.map((item) => ({
      value: item.name,
      label: item.name,
    }));
  }, [items]);
};
