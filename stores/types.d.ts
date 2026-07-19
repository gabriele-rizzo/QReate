type StoreWithSetAction<T> = T & { set: (state: T) => void };
