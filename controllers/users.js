const User = require("../models/user");


module.exports.registerUser = (req, res)=>
{
    res.render('users/register');
};


module.exports.createUser = async (req, res, next)=>
{
    try
    {
        const {email, username, password} = req.body;
        /*Make a new user*/
        const user = new User({email, username});
        const registerUser = await User.register(user, password);
        req.login(registerUser, err=>
        {
            if (err)
            {
                return next(err);
            }
            req.flash('success', "Thank you for registering. You can now log in to your account.");
            res.redirect('/login');
        });
    }catch (e)
    {
        req.flash('error', e.message);
        res.redirect('register');
    }
};


module.exports.loginUser = (req, res) =>
{
    res.render('users/login');
};


module.exports.flashUser = (req, res) =>
{
    req.flash('success', "You have successfully logged in.");
    // const redirectUrl = req.session.returnTo || '/campgrounds';
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    //delete req.session.returnTo;
    res.redirect(redirectUrl);
};


module.exports.logoutUser = (req, res, next)=>
{
    req.logout(function (err)
    {
        if (err)
        {
            return next(err);
        }
        req.flash('success', "You have successfully logged out.");
        res.redirect('/');
    });
};
