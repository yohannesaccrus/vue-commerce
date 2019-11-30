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
                  <textarea
                    v-model="product.desc"
                    placeholder="Product desc."
                    class="form-control"
                    rows="8"
                  ></textarea>
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
                    v-model="product.tag"
                    type="text"
                    placeholder="Product Tag"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlFile1">Gambar</label>
                  <input type="file" class="form-control-file" id="exampleFormControlFile1" />
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
import { db } from "../firebase";
import $ from "jquery";
import Swal from "sweetalert2";
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
  data() {
    return {
      heroImage: require("../assets/img/products.svg"),
      product: {
        name: null,
        desc: null,
        price: null,
        tag: null,
        image: null
      },
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
    modalCreate() {
      $("#createProduct").modal("show");
      Object.assign(this.$data, this.$options.data.apply(this));
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
    }
  }
};
</script>