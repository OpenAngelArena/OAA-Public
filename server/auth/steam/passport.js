import passport from 'passport';
import {Strategy as SteamStrategy} from 'passport-steam';
import SteamId from 'steamid';

export function setup(User, config) {
  console.log(config.steam.realm);
  passport.use(new SteamStrategy({
    realm: config.steam.realm,
    returnURL: config.steam.returnURL,
    apiKey: config.steam.apiKey
  },
  function(identifier, profile, done) {
    var sid = new SteamId(profile._json.steamid);

    User.findOne({email: sid.accountid}).exec()
      .then(user => {
        if(user) {
          return done(null, user);
        }

        user = new User({
          name: profile._json.realname,
          email: sid.accountid,
          role: 'user',
          provider: 'steam',
          steam: profile._json
        });
        user.save()
          .then(savedUser => done(null, savedUser))
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }));
}
