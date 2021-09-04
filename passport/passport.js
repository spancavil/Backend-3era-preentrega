const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const Users = require('../models/Users');
const bCrypt = require('bcrypt')

passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
    function (req,username, password, done) {
        Users.findOne({'username': username}, 
            function (err, user) {
                console.log("enter the tekken!")
                if (err) return done(err);
                if (!user) {
                    console.log('User not found with that username: ', username);
                    return done(null, false,
                        console.log('message', 'User not found.')
                        )
                }
                if (!isValidPassword(user, password)){
                    console.log('Invalid password');
                    return done (null, false, 
                            console.log('message', 'Invalid password.')
                        )
                }
                return done(null, user);
            }
        )
    }
))

passport.use('signup', new LocalStrategy(
    { passReqToCallback: true },
    function (req, username, password, done) {
        findOrCreateUser = function () {
            Users.findOne({ 'username': username }, (err, user) => {
                if (err) {
                    console.log('Error in SignUp: ', err);
                    return done(err);
                }
                if (user) {
                    console.log('User already exists');
                    return done(null, false, console.log('message', 'User Already Exists'));
                }
                console.log("Pasó las pruebas!")
                var newUser = new Users();
                newUser.username = username;
                newUser.password = createHash(password);
                newUser.fullName = req.body.fullName;
                newUser.lastName = req.body.lastName;
                newUser.email = req.body.email;
                newUser.telefono = req.body.telefono;
                //este es el path que me devuelve multer a través de file
                newUser.foto = req.file.path.substr(6);

                newUser.save((err) => {
                    if (err) {
                        console.log('Error saving new user: ', err);
                        throw err;
                    }
                    console.log('User registered sucessfully!');
                    return done(null, newUser);
                })
            })
        }
        process.nextTick(findOrCreateUser);
    }
));



const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

const isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
}

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    Users.findById(id, (err, user) => {
        done(err, user);
    });
});


module.exports = passport;