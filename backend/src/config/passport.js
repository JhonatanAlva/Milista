const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../models/db'); // importa la conexión a MySQL

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;

    // 1. Verifica si el usuario ya existe
    const [rows] = await db.query("SELECT * FROM users WHERE google_id = ?", [googleId]);

    let user;
    if (rows.length > 0) {
      user = rows[0]; // Ya existe
    } else {
      // 2. Si no existe, lo crea
      const [result] = await db.query("INSERT INTO users (google_id, name, email) VALUES (?, ?, ?)", [googleId, name, email]);
      user = {
        id: result.insertId,
        google_id: googleId,
        name,
        email
      };
    }

    // 3. Continúa el flujo
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});