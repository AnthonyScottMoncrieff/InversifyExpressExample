export const toPromiseResponse = <T extends unknown>(arg: T) : Promise<T> => {
    return new Promise((resolve) => {
        resolve(arg);
    })
}