import passport from 'passport';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';

export function setup(User, config) {
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.find({
      'googleID': profile.id
    })
      .then(user => {
        if (user) {
          return done(null, user);
        }
        user = User.build({
          name: profile.displayName,
          email: profile.emails[0].value,
          role: 'user',
          username: profile.emails[0].value.split('@')[0],
          provider: 'google',
          google: profile._raw,
          googleID: profile.id
        });
        var oxhnEmail = /[A-Za-z]{3,}@oxhn.com/g;
        
        if (!user.email.match(oxhnEmail)){
            user.save()
                .then(user => done(null, user))
                .catch(err => done(err));
        } else {
            return done(null, false, { message: 'Email is Not of OXHN Domain!' });
        }

      })
      .catch(err => done(err));
  }));
}
