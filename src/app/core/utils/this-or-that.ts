import { from, Observable, of } from 'rxjs';

/**
 * RxJS conditional operator.
 *
 * Same as `iif` rxjs operator except it doesn't eagerly execute function.
 * it be used instead of `iif` to save yourself time.
 *
 * @description
 * Accepts a condition function and two Observables ($this and $that).
 *
 * if condition function evaluate to true then $this will be called and subscribed to returned observable.
 *
 * if condition function evaluate to false then $that will be called and subscribed to returned observable.
 *
 * @example
 * ```typescript
 * from([10, 11, 12, 13])
 *   .pipe(
 *         switchMap((number) => {
 *            return thisOrThat(
 *               () => number % 2 === 0,
 *                () => of('Even'),
 *                () => of('Odd'),
 *            )
 *        })
 *    )
 * .subscribe(console.log);
 *
 * ```
 *
 * @param condition function that returns true or false
 * @param $this
 * @param $that
 * @returns
 */
export const thisOrThat = <T>(
    condition: () => boolean,
    $this: () => Observable<T> | Promise<T>,
    $that: () => Observable<T> | Promise<T> = () => of(null as any)
): Observable<T> => {
    const coerce = (fn: any) => fn instanceof Promise ? from(fn) : fn;
    if (condition()) {
        return coerce($this());
    }
    return coerce($that());
};
