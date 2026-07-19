type StoreWithActions<T> = T & { set: (state: T) => void; reset: () => void };
