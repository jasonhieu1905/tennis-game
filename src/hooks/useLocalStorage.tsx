import { useState, useEffect } from "react";

const PREFIX_KEY = "tennis-";

export default function useLocalStorage(key: string, initialValue?: string | Function) {
  const prefixedKey = PREFIX_KEY + key;
  
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
