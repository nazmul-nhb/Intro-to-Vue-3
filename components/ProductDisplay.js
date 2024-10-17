app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Array,
      required: true,
    }
  },

  template:
    /*html*/
    `<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img v-bind:src="image">
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>

          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>

          <p>Shipping: {{ shipping }}</p>

          <product-details :details="details"></product-details>

          <div
            v-for="(variant, index) in variants"
            :key="variant.id"
            @mouseover="updateVariant(index)"
            class="color-circle"
            :style="{ backgroundColor: variant.color }">
          </div>

          <button
            class="button"
            :class="{ disabledButton: !inStock }"
            :disabled="!inStock"
            v-on:click="addToCart">
            Add to Cart
          </button>

          <button
            class="button"
            :class="{ disabledButton: !isVariantInCart }"
            :disabled="!isVariantInCart"
            @click="removeFromCart">
            Remove from Cart
          </button>
        </div>
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div>`,

  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      details: ['50% Cotton', '30% Wool', '20% Polyester'],
      variants: [
        { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 5 },
      ],
      reviews: []
    }
  },

  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
    },
    updateVariant(index) {
      this.selectedVariant = index
    },
    addReview(review) {
      this.reviews.push(review)
    }
  },

  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock() {
      // Count how many of the selected variant are in the cart
      const variantCountInCart = this.cart.filter(item => item === this.variants[this.selectedVariant].id).length;

      // Compare the number in the cart to the stock quantity of the selected variant
      return this.variants[this.selectedVariant].quantity > variantCountInCart;
    },
    isVariantInCart() {
      // Check if the currently selected variant exists in the cart
      return this.cart.includes(this.variants[this.selectedVariant].id);
    },
    shipping() {
      return this.premium ? 'Free' : 2.99;
    }
  }

})