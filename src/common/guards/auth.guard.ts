import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwksClient } from "jwks-rsa";
import { Observable } from "rxjs";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        const client = new JwksClient({
            jwksUri: 'https://umlqruhkddzoifckedkm.supabase.co/auth/v1/keys'
        });

        const getKey = (header, callback) => {
            client.getSigningKey(header.kid, (err, key) => {
                const signingKey = key?.getPublicKey();
                callback(null, signingKey)
            });
        }

        try {
            const decoded = await new Promise((resolve, reject) => {
                jwt.verify(token, getKey, {}, (err, decoded) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(decoded)
                    }
                })
            })
            request.user = decoded;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token!');
        }
    }
}