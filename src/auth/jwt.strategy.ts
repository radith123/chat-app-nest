import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:
                'AaCgOiX_CfiZu2x6vW30jm35N0wO1OEKtR_KF8Ir0TOpRgudvSj-8NsdvThKwSyL8sLY9OvEsBQZ6gEhljcRng',
        });
    }

    async validate(payload: any) {

        console.log('JWT Payload:', payload); // Log payload for debugging
        return { userId: payload.sub, username: payload.username };
    }
}
