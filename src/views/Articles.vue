<template>
  <Layout>
    <div class="wrapper">
      <h2>All Posts</h2>
      <table class="table" v-if="getArticlesStatus != 'loading'">
        <thead>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>Tags</th>
          <th>Excerpt</th>
          <th>Created</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="(article, i) in articles" :key="article.slug">
            <td>{{ offset + i + 1 }}</td>
            <td>{{ article.title }}</td>
            <td>{{ article.author.username }}</td>
            <td>{{ article.tagList.join(", ") }}</td>
            <td>{{ article.body }}</td>
            <td>{{ article.createdAt | formatDate }}</td>
            <td>
              <div class="dropdown">
                <button
                  class="btn btn-info dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >...</button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Edit</a>
                  <a class="dropdown-item" href="#">Delete</a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row justify-content-center" v-if="getArticlesStatus != 'loading'">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li class="page-item" v-for="(page, i) in getArticlesPages" :key="i">
              <router-link
                class="page-link"
                :to="i+1 == 1 ? `/articles` : `/articles/page/${i+1}`"
              >{{ i + 1 }}</router-link>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <Loading :isShow="getArticlesStatus == 'loading'" />
    </div>
  </Layout>
</template>

<script>
import Layout from '../layouts/Layout';
import Loading from '../components/Loading';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      articles: [],
      offset: ''
    };
  },
  created() {
    this.fetchArticlesAgain();
  },
  methods: {
    ...mapActions({
      fetchArticles: 'articles/FETCH_ARTICLES_REQ',
    }),
    fetchArticlesAgain: function() {
      this.offset = ((this.$route.params.page || 1) - 1) * 10;
      this.fetchArticles({
        limit: 10,
        offset: this.offset,
      }).then(() => {
        this.articles = this.getArticles;
      });
    },
  },
  computed: {
    ...mapGetters({
      getArticles: 'articles/getArticles',
      getArticlesPages: 'articles/getArticlesPages',
      getArticlesStatus: 'articles/getArticleStatus',
    }),
  },
  watch: {
    // call again the method if the route changes
    '$route.params.page': function() {
      this.fetchArticlesAgain();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
  },
  components: {
    Layout,
    Loading,
  },
  filters: {
    formatDate: function(isoDate) {
      const date = new Date(isoDate);
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return `${
        monthNames[date.getMonth()]
      } ${date.getDate()} ,${date.getFullYear()}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  min-height: 300px;
}

.table {
  thead {
    background-color: #eceeef;
    height: 40px;
  }
}

h2 {
  margin: 30px 0;
}
</style>