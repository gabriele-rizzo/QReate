export function wait<T>(promise: Promise<T>, ms: number): Promise<T> {
    const wait = new Promise((resolve) => setTimeout(resolve, ms));
    const result = Promise.all([promise, wait]).then(([result]) => result);

    return result;
}
