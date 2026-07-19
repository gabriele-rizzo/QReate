type StoreWithActions<T> = T & {
    set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
    reset: () => void;
};
