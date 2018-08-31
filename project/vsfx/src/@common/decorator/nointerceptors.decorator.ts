import { __DefinePrivateProperty } from '../utils/property';
export const NoInterceptors = () => {
    return (target: any) => {
        __DefinePrivateProperty(target.prototype, '_noInterceptors', true);
    }
}