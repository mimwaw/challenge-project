<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li :class="[ 'page-item', { 'disabled': currentPage === 1 }]">
        <router-link
          class="page-link"
          :to="currentPage == 1 ? '/articles' : `/articles/page/${currentPage - 1}`"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </router-link>
      </li>
      <li
        :class="[ 'page-item', { 'active': page.isActivated } ]"
        v-for="(page, i) in pages"
        :key="i"
      >
        <router-link
          class="page-link"
          :to="page.name === 1 ? `/articles` : `/articles/page/${page.name}`"
        >{{ page.name }}</router-link>
      </li>
      <li :class="[ 'page-item', { 'disabled': currentPage === totalPages }]">
        <router-link class="page-link" :to="`/articles/page/${currentPage + 1}`">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>


<script>
export default {
  props: {
    currentPage: {
      Number,
      required: true,
      default: 1,
    },
    visiblePages: {
      Number,
      required: true,
      default: 5
    },
    totalPages: {
      Number,
      required: true,
    },
  },
  computed: {
    startPage: function() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages > this.visiblePages
          ? this.totalPages - this.visiblePages + 1
          : 1;
      }

      return this.currentPage > 2 ? this.currentPage - Math.floor(this.visiblePages / 2) : 1;
    },
    endPage: function() {
      return Math.min(this.startPage + this.visiblePages - 1, this.totalPages);
    },
    pages() {
      const pages = [];

      for (let i = this.startPage; i <= this.endPage; i++) {
        pages.push({
          name: i,
          isActivated: i == this.currentPage,
        });
      }

      return pages;
    },
  },
};
</script>