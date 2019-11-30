<template>
  <div class="vueAdmin">
    <div class="adminHero">
      <div class="adminHero__texts">
        <h2>Crud Area</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor ullam deleniti, dolorum quas architecto distinctio aspernatur temporibus est! Dolore perspiciatis ipsam reiciendis harum facere quod labore impedit ea quas ab.</p>
      </div>
      <div class="adminHero__visual">
        <img :src="heroImage" alt="heroImg" />
      </div>
    </div>
    <hr />
    <h3>CRUD Now w/ firebase</h3>
    <div class="form-group">
      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control" />
    </div>
    <div class="form-group">
      <input type="number" placeholder="Product Price" v-model="product.price" class="form-control" />
    </div>
    <div class="form-group">
      <button @click="createProduct" class="btn btn-success">Create Product</button>
    </div>
    <hr />
    <h3>Product List</h3>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ product.data().name }}</td>
            <td>{{ product.data().price }}</td>
            <td>
              <button @click="selectUpdate(product)" class="vueBtn mr-2 btn-info">Update</button>
              <button @click="deleteProduct(product.id)" class="vueBtn btn-warning">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="modal fade" id="updateProduct" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="updateModal">
            <h3>Update Product</h3>
            <div class="form-group">
              <input
                type="text"
                placeholder="Product Name"
                v-model="product.name"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <input
                type="number"
                placeholder="Product Price"
                v-model="product.price"
                class="form-control"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateProduct" type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { db } from "../firebase";
export default {
  name: "products",
  data() {
    return {
      heroImage: require("../assets/img/crud.svg"),
      products: [],
      product: {
        name: null,
        price: null
      },
      updatedProduct: null
    };
  },
  methods: {
    realTime() {
      db.collection("products").onSnapshot(querySnapshot => {
        this.products = [];
        querySnapshot.forEach(doc => {
          this.products.push(doc);
        });
      });
    },
    updateProduct() {
      db.collection("products")
        .doc(this.updatedProduct)
        .update(this.product)
        .then(() => {
          alert("document with ID " + this.updatedProduct + " is updated");
          $("#updateProduct").modal("hide");
          this.realTime();
        })
        .catch(err => {
          console.error("Error deleting document: ", err);
        });
    },
    selectUpdate(product) {
      $("#updateProduct").modal("show");
      this.product = product.data();
      this.updatedProduct = product.id;
    },
    deleteProduct(id) {
      if (confirm("Are you sure to delete ?")) {
        db.collection("products")
          .doc(id)
          .delete()
          .then(() => {
            alert("document with ID " + id + " is deleted");
            this.realTime();
          })
          .catch(err => {
            console.error("Error deleting document: ", err);
          });
      }
    },
    readProduct() {
      db.collection("products")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.products.push(doc);
          });
        });
    },
    createProduct() {
      db.collection("products")
        .add(this.product)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          Object.assign(this.$data, this.$options.data.apply(this));
          this.readProduct();
        })
        .catch(err => {
          console.error("Error adding document: ", err);
        });
    },
    resetForm() {}
  },
  created() {
    this.readProduct();
  }
};
</script>