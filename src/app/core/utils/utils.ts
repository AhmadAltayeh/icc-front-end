import {Observable, Observer, Subject} from 'rxjs';

export namespace AppUtils {

  /**
   * Checks if the givin value is url
   */
  export const isUrl = (value: string) => {
    try {
      return !!(new URL(value));
    } catch (error) {
      return false;
    }
  };

  /**
   * Check if the type is image
   *
   * @param type file mimetypes like jpg jpg jpeg png bmp gif
   */
  export const isImage = (type: string) => /(\.jpg|\.png|\.bmp|\.gif|\.jpeg)$/i.test(type);

  /**
   * Check if the givin value is file type
   * File type includes the images
   */
  export const isFile = (type: string) => AppUtils.isImage(type) || AppUtils.isPdf(type);

  /**
   * Check if the type is pdf type
   */
  export const isPdf = (type: string) => /(.pdf|application\/pdf)/.test(type);

  /**
   * generate a random alphapetic string
   *
   * @param length the maximum length of the string
   */
  export const generateAlphabeticString = (length = 5): string => {
    let randomString = '';
    let randomAscii: number;
    const asciiLow = 65;
    const asciiHigh = 90;
    for (let i = 0; i < length; i++) {
      randomAscii = Math.floor((Math.random() * (asciiHigh - asciiLow)) + asciiLow);
      randomString += String.fromCharCode(randomAscii);
    }
    return randomString;
  };

  /**
   * Encode file to base 64 text format
   */
  export const readFile = (file: File): Observable<string> => new Observable((observer: Observer<string>) => {
    const reader = new FileReader();
    reader.addEventListener('abort', error => observer.error(error));
    reader.addEventListener('error', error => observer.error(error));
    reader.addEventListener('loadend', () => {
      observer.next(reader.result as any);
      observer.complete();
    });
    reader.readAsDataURL(file);
  });

  /**
   * Complete a Subject
   */
  export const unsubscribe = (subscription: Subject<any>) => {
    subscription.next(null);
    subscription.complete();
  };

  /**
   * checks if the value is string or not if so it will return true if it has at least one char
   * NOTE: the value will be trimmed before the evaluation
   *
   * @param value to be checked
   */
  export const isEmptyString = (value: string) => typeof value !== 'string' || value.trim() === '';

  export const isNullOrUndefined = (value: any): value is undefined | null => value === undefined || value === null;

  export const notNullOrUndefined = <T>(value: T): value is Exclude<T, null | undefined> => !isNullOrUndefined(value);

  export const preventBubblingAndCapturing = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  /**
   * convert an object with key:value to query param string
   * null and undefined values will be omited
   */
  export const convertObjectToQueryParams = (obj: Record<string, any>) => Object.keys(obj)
    .reduce((acc, curr, index, thisArray) => {
      if (isNullOrUndefined(obj[curr])) {
        return acc;
      }
      const lastIndex = thisArray.length - 1 === index;
      return acc += `${curr}=${obj[curr]}${lastIndex ? '' : '&'}`;
    }, '');


  /**
   * Create UUID
   * @return {string} uuid
   */
  export const createUUID = (): string => {
    // ^ NOR Diff of 2 items
    // & AND True/False if EVEN/EVEN
    // >> Shift right
    // [1e7]+-1e3+-4e3+-8e3+-1e11 => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'

    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
  }

}
