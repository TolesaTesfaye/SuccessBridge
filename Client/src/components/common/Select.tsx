import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface SelectItemData {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  setPlaceholder: (placeholder?: string) => void;
  items: SelectItemData[];
  registerItem: (item: SelectItemData) => void;
  unregisterItem: (value: string) => void;
}

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const ctx = useContext(SelectContext);
  if (!ctx) {
    throw new Error("Select components must be used within <Select>");
  }
  return ctx;
}

export function Select({
  value,
  onValueChange,
  children,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<SelectItemData[]>([]);
  const [placeholder, setPlaceholder] = useState<string>();

  const registerItem = useCallback((item: SelectItemData) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.value === item.value);
      if (idx === -1) return [...prev, item];
      const next = [...prev];
      next[idx] = item;
      return next;
    });
  }, []);

  const unregisterItem = useCallback((itemValue: string) => {
    setItems((prev) => prev.filter((i) => i.value !== itemValue));
  }, []);

  const contextValue = useMemo(
    () => ({
      value,
      onValueChange,
      placeholder,
      setPlaceholder,
      items,
      registerItem,
      unregisterItem,
    }),
    [value, onValueChange, placeholder, items, registerItem, unregisterItem],
  );

  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { value, onValueChange, placeholder, items } = useSelectContext();

  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-10 w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 pr-9 text-sm text-foreground shadow-sm outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
          className,
        )}
        value={value ?? ""}
        onChange={(e) => onValueChange?.(e.target.value)}
      >
        {placeholder && (
          <option value="" disabled hidden={Boolean(value)}>
            {placeholder}
          </option>
        )}
        {items.map((item) => (
          <option key={item.value} value={item.value} disabled={item.disabled}>
            {item.label}
          </option>
        ))}
      </select>
      {children}
    </div>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { setPlaceholder } = useSelectContext();
  useEffect(() => {
    setPlaceholder(placeholder);
    return () => setPlaceholder(undefined);
  }, [placeholder, setPlaceholder]);
  return null;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SelectItem({
  value,
  disabled,
  children,
}: {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const { registerItem, unregisterItem } = useSelectContext();

  useEffect(() => {
    registerItem({ value, label: children, disabled });
    return () => unregisterItem(value);
  }, [value, children, disabled, registerItem, unregisterItem]);

  return null;
}
