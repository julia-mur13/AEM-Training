export function delay<T>(promise: Promise<T>, timeout = 500): Promise<T> {
    return promise && promise.then((response: T) => {
        return new Promise<T>((resolve) => {
            setTimeout(() => resolve(response), timeout)
        });
    });
}