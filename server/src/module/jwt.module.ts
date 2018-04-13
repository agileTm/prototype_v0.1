import { sign, verify } from 'jsonwebtoken';
import { Config } from '../config/config';


export const signJWT = (data: any) => sign(data, Config.JWT_KEY);

export const verifyJWT = (jwt: string) => {
    return new Promise((resolve, reject) => {
        verify(jwt, Config.JWT_KEY, function (err: any, decoded: any) {
            if (err) {
                reject(err);
                return;
            }

            resolve(decoded);
        });
    })
};