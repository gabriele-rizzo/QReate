type StoreWithActions<T> = T & {
    set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
    reset: () => void;
    /** The state the store was created with — the baseline for reset and URL diffs. */
    initial: T;
};
