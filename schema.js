const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    country:Joi.string().required(),
    location: Joi.string().required(),
    // image : Joi.object({
    //     url:Joi.string().allow("", null),     // this was conflicting with mongoose model where a default file is shown when no file is uploaded
    // }),
}).required();


module.exports.reviewSchema = Joi.object({
  comment:Joi.string().required(),
  rating: Joi.number().required().min(1).max(5),
}).required();

module.exports.signupSchema = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
}).required();
/*

Perfect 👌 let’s break down that Joi schema line by line, function by function so it’s crystal clear.

Here’s the code again:

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().min(18).optional(),
});

1. Joi.object({...})

This creates a schema for an object.
Inside the { ... } we define rules for each key of the object.
In our case, the object should look like:

{
  "username": "...",
  "email": "...",
  "password": "...",
  "age": ...
}

2. username: Joi.string().min(3).max(30).required()
Joi.string() → the field must be a string.
.min(3) → must have at least 3 characters.
.max(30) → must not exceed 30 characters.
.required() → this field is mandatory (cannot be missing or empty).

👉 Example: "JohnDoe" ✅ valid, "Jo" ❌ invalid (too short).

3. email: Joi.string().email().required()
Joi.string() → must be a string.
.email() → must match the email format (user@example.com).
.required() → must be present.

👉 "test@example.com" ✅ valid, "test123" ❌ invalid.

4. password: Joi.string().min(6).required()
Joi.string() → must be a string.
.min(6) → at least 6 characters long.
.required() → cannot be missing.

👉 "abc123" ✅ valid, "123" ❌ too short.

5. age: Joi.number().min(18).optional()
Joi.number() → must be a number.
.min(18) → must be at least 18.
.optional() → this field is not required, but if provided, it must follow the rules.

👉 25 ✅ valid, 15 ❌ invalid, field missing ✅ valid.

How Joi interprets this schema
The incoming object must have:
username (string, 3–30 chars)
email (valid email)
password (string, min 6 chars)
The age field is optional, but if present, must be a number ≥ 18.

✅ Example valid object:

{
  "username": "arijit",
  "email": "arijit@example.com",
  "password": "mypassword",
  "age": 22
}


❌ Example invalid object:

{
  "username": "a",    // too short
  "email": "wrong@",  // invalid email
  "password": "123",  // too short
  "age": 15           // too young
}

*/
