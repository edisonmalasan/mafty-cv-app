import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { AuthProvider } from "@prisma/client";
import { AuthService } from "../modules/auth/auth.service";
import { env } from "./env";

//
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: any,
      done: any,
    ) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("No email found in Google profile"));
        }

        const result = await AuthService.loginOrCreate0AuthUser({
          email,
          name: profile.displayName,
          avatarUrl: profile.photos?.[0]?.value,
          provider: AuthProvider.GOOGLE,
          providerId: profile.id,
        });

        return done(null, result);
      } catch (err) {
        return done(err as Error, undefined);
      }
    },
  ),
);

// github
passport.use(
  new GitHubStrategy(
    {
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: any,
      done: any,
    ) => {
      try {
        // choosing primary verified email for github acc
        const email =
          profile.emails?.find((e: any) => e.primary && e.verified)?.value ??
          profile.emails?.[0]?.value;

        if (!email) {
          return done(
            new Error(
              "No verified email on your GitHub account. Please add one and try again.",
            ),
            undefined,
          );
        }

        const result = await AuthService.loginOrCreate0AuthUser({
          email,
          name: profile.displayName || profile.username,
          avatarUrl: profile.photos?.[0]?.value,
          provider: AuthProvider.GITHUB,
          providerId: profile.id,
        });

        return done(null, result);
      } catch (error) {
        return done(error as Error, undefined);
      }
    },
  ),
);
export default passport;
