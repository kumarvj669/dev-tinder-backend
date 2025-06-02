const validateSignupRequest = (req) => {
   const { firstname, lastname, email, password, photourl, skills } = req.body;
   if(!firstname || firstname.length == 0){
    throw new Error("firstname is required");
   }
   if(!email || email.length == 0){
    throw new Error("Email is required");
   }
   if(!password || password.length == 0){
    throw new Error("Password is required");
   }
   if( password.length < 6){
    throw new Error("Password must be atleast 6 characters long");
   }
}

const validateLoginRequest = (req) => {
    const { email, password } = req.body;
    if(!email){
        throw new Error("Email is required")
    }
    if(!password){
        throw new Error("Password is required")
    }
}

module.exports = {
    validateSignupRequest,
    validateLoginRequest
}