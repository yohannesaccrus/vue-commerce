<template>
  <div class="vueAdmin">
    <div class="adminHero">
      <div class="adminHero__texts">
        <h2>Profile Area</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor ullam deleniti, dolorum quas architecto distinctio aspernatur temporibus est! Dolore perspiciatis ipsam reiciendis harum facere quod labore impedit ea quas ab.</p>
      </div>
      <div class="adminHero__visual">
        <img :src="heroImage" alt="heroImg" />
      </div>
    </div>
    <hr />
    <ul class="nav nav-pills ml-3" id="myTab" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="profile-tab"
          data-toggle="tab"
          href="#profile"
          role="tab"
          aria-controls="profile"
          aria-selected="true"
        >Profile</a>
      </li>

      <li class="nav-item">
        <a
          class="nav-link"
          id="account-tab"
          data-toggle="tab"
          href="#account"
          role="tab"
          aria-controls="account"
          aria-selected="false"
        >Account settings</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active pt-3"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <input v-model="profile.name" type="text" placeholder="Name" class="form-control" />
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <input v-model="profile.phone" type="text" placeholder="Phone" class="form-control" />
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <input
                  v-model="profile.address"
                  type="text"
                  placeholder="Address"
                  class="form-control"
                />
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <input
                  v-model="profile.postCode"
                  type="text"
                  placeholder="Postcode"
                  class="form-control"
                />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <button @click="updateProfile" class="btn vueBtn btn-success w-100">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tab-pane fade pt-3" id="account" role="tabpanel" aria-labelledby="account-tab">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <input type="text" placeholder="User name" class="form-control" />
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <input type="text" placeholder="Email address" class="form-control" />
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <input type="text" placeholder="New password" class="form-control" />
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <input type="text" placeholder="Confirm password" class="form-control" />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <input type="file" class="form-control" />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <input type="submit" value="Save Changes" class="btn btn-primary w-100" />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <input
                  type="button"
                  @click="resetPassword"
                  value="Reset password email"
                  class="btn btn-success w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
export default {
  name: "profile",
  data() {
    return {
      heroImage: require("../assets/img/profile.svg"),
      profile: {
        name: null,
        phone: null,
        address: null,
        postCode: null
      },
      account: {
        name: null,
        email: null,
        photoUrl: null,
        emailVerified: null,
        password: null,
        confirmPassword: null,
        uid: null
      }
    };
  },
  firestore() {
    const user = fb.auth().currentUser;
    return {
      profile: db.collection("profiles").doc(user.uid)
    };
  },
  methods: {
    resetPassword() {
      const auth = fb.auth();
      auth
        .sendPasswordResetEmail(auth.currentUser.email)
        .then(() => {
          console.log("email sent");
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateProfile() {
      this.$firestore.profile.update(this.profile);
    }
  }
};
</script>