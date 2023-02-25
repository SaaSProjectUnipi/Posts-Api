import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {GoogleUserDto} from "./dto/GoogleUserDto.dto";

export class GoogleStrategy extends PassportStrategy(Strategy,"google"){
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK || "http://localhost:8080/auth/google/callback",
            scope: ["email", "profile"],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<GoogleUserDto>{
        const { name, emails ,photos } = profile;
        return {
            email: emails[0]?.value,
            firstName: name?.givenName,
            lastName: name?.familyName,
            picture: photos[0]?.value,
            accessToken: accessToken,
        }


    }
}