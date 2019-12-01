<template>
  <div class="vueAdmin">
    <div class="adminHero">
      <div class="adminHero__texts">
        <h2>Products Area</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor ullam deleniti, dolorum quas architecto distinctio aspernatur temporibus est! Dolore perspiciatis ipsam reiciendis harum facere quod labore impedit ea quas ab.</p>
      </div>
      <div class="adminHero__visual">
        <img :src="heroImage" alt="heroImg" />
      </div>
    </div>
    <hr />
    <h3>Product List</h3>
    <button class="vueBtn btn-success mb-3" @click="modalCreate">Create Product</button>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <th>Name</th>
          <th>Price</th>
          <th style="text-align:center">Action</th>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product['.key']">
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td style="text-align:center">
              <button @click="setProductUpdated(product)" class="vueBtn mr-2 btn-info">Update</button>
              <button @click="deleteProduct(product)" class="vueBtn btn-warning">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="modal fade bd-example-modal-lg" id="createProduct" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="updateModal">
            <h4>Create Product</h4>
            <div class="modal__body">
              <div class="modal__main">
                <div class="form-group">
                  <input
                    v-model="product.name"
                    type="text"
                    placeholder="Product Name"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <vue-editor v-model="product.desc"></vue-editor>
                </div>
              </div>
              <div class="modal__detail">
                <h5>Product Detail</h5>
                <div class="form-group">
                  <input
                    v-model="product.price"
                    type="number"
                    placeholder="Product Price"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input
                    v-model="tag"
                    @keyup.188="addTag"
                    type="text"
                    placeholder="Product Tag"
                    class="form-control"
                  />
                  <div class="modal__tags">
                    <span
                      v-for="(tag, index) in product.tags"
                      :key="index"
                      class="badge badge-pill badge-primary"
                    >{{ tag.replace(',', '') }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlFile1">Gambar</label>
                  <input
                    type="file"
                    @change="uploadProductImage"
                    class="form-control-file"
                    id="exampleFormControlFile1"
                  />

                  <div class="modal__images">
                    <div class="modal__image" v-for="(image, index) in product.images" :key="index">
                      <button @click="deleteImage(image, index)">
                        <i class="fas fa-times"></i>
                      </button>
                      <img :src="image" alt="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="updateProduct"
              v-if="mode === 'update'"
              type="button"
              class="vueBtn btn-primary"
            >Update Product</button>
            <button
              @click="createProduct"
              v-if="mode === 'create'"
              type="button"
              class="vueBtn btn-success"
            >Create Product</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
import $ from "jquery";
import Swal from "sweetalert2";
import { VueEditor } from "vue2-editor";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

export default {
  name: "products",
  components: {
    VueEditor
  },
  data() {
    return {
      heroImage: require("../assets/img/products.svg"),
      product: {
        name: null,
        desc: null,
        price: null,
        tags: [],
        images: []
      },
      tag: null,
      mode: null,
      updatedProduct: null
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    modalCreate() {
      $("#createProduct").modal("show");
      this.reset();
      this.mode = "create";
    },
    createProduct() {
      this.$firestore.products.add(this.product);
      $("#createProduct").modal("hide");
    },
    setProductUpdated(product) {
      this.mode = "update";
      this.product = product;
      $("#createProduct").modal("show");
    },
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);
      $("#createProduct").modal("hide");
      Toast.fire({
        icon: "success",
        title: "Updated successfully"
      });
    },
    deleteProduct(product) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.products.doc(product.id).delete();
          Toast.fire({
            icon: "success",
            title: "Deleted successfully"
          });
        }
      });
    },
    addTag() {
      const newTag = this.tag.replace(",", "");
      this.product.tags.push(newTag);
      this.tag = "";
    },
    uploadProductImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        let storageRef = fb.storage().ref("products/" + file.name);
        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          snapshot => {},
          err => {
            console.log("upload failed", err);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.product.images.push(downloadURL);
              console.log("URL: ", downloadURL);
            });
          }
        );
      }
    },
    deleteImage(image, index) {
      let selectedImage = fb.storage().refFromURL(image);

      this.product.images.splice(index, 1);
      selectedImage
        .delete()
        .then(() => {
          console.log("image deleted");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>