
export namespace SessionStorage {
    const isSupport = () => {
        if (window && window.sessionStorage !== undefined) {
            return true;
        } else {
            console.error('This Browser is not supported: sessionStorage');
            return false;
        }
    };

    export const set = (key: string, value: any): void => {
        if (isSupport()) {
            window.sessionStorage.setItem(key, JSON.stringify(value));
        }
    };

    export const get = (key: string) => {
        if (isSupport()) {
            const value: any = window.sessionStorage.getItem(key);
            return JSON.parse(value);
        }
    };

    export const remove = (key: string) => {
        if (isSupport()) {
            window.sessionStorage.removeItem(key);
        }
    };
}
