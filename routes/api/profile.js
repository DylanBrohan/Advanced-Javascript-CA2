// Fetch the users profile
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load User Model
const User = require("../../models/User");

// Load Profile Model
const profile = require("../../models/Profile");

// Loads Validation
const validateProfileInput = require("../../validation/music-profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// GET API/profile/handle
// Get profile by handle
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.statusCode(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// Request users Id
router.get(
  "/",
  // Private route needs a jwt to access
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    // find the profile
    Profile.findOne({ user: req.user.id })
      // populate the user (ref) with name & avatar variables from user model
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          // if their is not profile
          errors.noprofile = "There is no profile for this user";
          // send back an error
          return res.status(404).json(errors);
        }
        // else json object of profile
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);
// GET API/profile/user/:user_id
// Get profile by userId
// if the user has no Profile. Error
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.statusCode(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// GET API/profile/all
// Get all profiles
router.get("/all", (req, res) => {
  const errors = {};
  // Populate user reference with - name & avatar
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There is no profiles";
        return res.status(404).json();
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There is no profiles" }));
});

// Post api/profile/experience
// add experience field to profiles
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    // CHECK Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Find profile by id
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      // then create a newExp
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // Add to exp array
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// POST API/
// Creates/Edits users Profile
router.post(
  "/",
  // Private Route
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Destructure from the state
    const { errors, isValid } = validateProfileInput(req.body);

    // CHECK Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Post api/profile/Education
    // add education field to profiles
    router.post(
      "/education",
      passport.authenticate("jwt", {
        session: false
      }),
      (req, res) => {
        const { errors, isValid } =
          // ValidateEducationInput is a function in validation folder ->
          validateEducationInput(req.body);
        // CHECK Validation
        if (!isValid) {
          // Return any errors with 400 status
          return res.status(400).json(errors);
        }

        Profile.findOne({
          user: req.user.id
        }).then(profile => {
          // Create a new Education
          const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
          };

          // Add to education array
          profile.education.unshift(newEdu);
          profile.save().then(profile => res.json(profile));
        });
      }
    );

    //  Get Fields of the users profile
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //   Skills - Split into an Array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    //   Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create
        // Check if handle exists
        Profile.findOne({
          handle: profileFields.handle
        }).then(profile => {
          if (profile) {
            errors.handle = "That handle  already exists";
            res.status(400).json(errors);
          }

          // Saves profile updated
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// DELETE api/profile/Experience/
// DELETE experience from profiles
router.delete(
  // Delete experience by its id
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Saves changes
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(profile));
  }
);

// DELETE api/profile/Education/
// DELETE Education from profiles
router.delete(
  // remove education by its id
  "/education/:edu_id",
  // Private route needs to have a jwt to access
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        // Get remove index(Education array)
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Saves changes
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(profile));
  }
);

// DELETE api/profile/
// DELETE User & profiles
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
