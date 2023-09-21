import { useState, useEffect, Dispatch, SetStateAction } from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        const savedValue = localStorage.getItem(key);

        if (savedValue) return JSON.parse(savedValue) as T;

        if (initialValue instanceof Function) return initialValue();
        return initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}
