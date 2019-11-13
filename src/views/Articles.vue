<template>
  <Layout>
    <div class="wrapper">
      <h2>All Posts</h2>
      <table
        class="table table-responsive"
        v-if="getArticlesStatus != 'loading' && articles.length > 0"
      >
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
            <td>{{ article.tagList.join(', ') }}</td>
            <td>{{ article.body | formatBody }}</td>
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
                >
                  ...
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <router-link class="dropdown-item" :to="`/articles/edit/${article.slug}`">Edit</router-link>
                  <a
                    class="dropdown-item"
                    href="#"
                    data-toggle="modal"
                    :data-target="`#${article.slug}`"
                    >Delete</a
                  >
                </div>
              </div>
            </td>
            <Modal
              title="Delete Article"
              :id="article.slug"
              @modalConfirm="modalConfirm(article.slug)"
            >
              Are you sure to delete Article?
            </Modal>
          </tr>
        </tbody>
      </table>
      <div v-if="getArticlesStatus != 'loading' && articles.length == 0">
        <div class="row justify-content-center">
          There is no post here yet.
        </div>
      </div>
      <div
        class="row justify-content-center"
        v-if="getArticlesStatus != 'loading' && articles.length > 0"
      >
        <Pagination
          :totalPages="getArticlesPages"
          :visiblePages="5"
          :currentPage="Number.parseInt($route.params.page) || 1"
        />
      </div>
      <Loading :isShow="getArticlesStatus == 'loading'" />
      <Toast
        :type="toast.type"
        :isShow="toast.visible"
        @close="hideDeletedToast"
        >{{ toast.text }}</Toast
      >
      <Toast
        type="success"
        :isShow="toast.createdToast == true"
        @close="hideCreatedToast"
      >
        <b>Well done!</b> Article created successfuly
      </Toast>
      <Toast
        type="success"
        :isShow="toast.updatedToast == true"
        @close="hideUpdatedToast"
      >
        <b>Well done!</b> Article updated successfuly
      </Toast>
    </div>
  </Layout>
</template>

<script>
import Layout from '../layouts/Layout';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import Pagination from '../components/Pagination';
import { mapActions, mapGetters } from 'vuex';

export default {
  metaInfo: {
    title: 'Articles'
  },
  data() {
    return {
      articles: [],
      offset: '',
      articleToDelete: '',
      toast: {
        type: '',
        visible: false,
        text: '',
        createdToast: this.$route.params.created || '',
        updatedToast: this.$route.params.updated || ''
      },
    };
  },
  created() {
    this.fetchArticlesAgain();
    if (this.$route.params.page > this.getArticlesPages) {
      this.$router.push('/404');
    }
  },
  methods: {
    ...mapActions({
      fetchArticles: 'articles/FETCH_ARTICLES_REQ',
      deleteArticle: 'articles/DELETE_ARTICLES',
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
    modalConfirm: function(slug) {
      // console.log(this.articleToDelete);
      this.deleteArticle(slug)
        .then(res => {
          this.toast.type = 'success';
          this.toast.text = 'Article deleted successfuly';
          this.toast.visible = true;
        })
        .catch(error => {
          this.toast.type = 'error';
          this.toast.text = 'Failed to delete the article.';
          this.toast.visible = true;
        });
    },
    hideDeletedToast: function() {
      this.toast.visible = false;
    },
    hideCreatedToast: function() {
      this.toast.createdToast = false;
    },
    hideUpdatedToast: function() {
      this.toast.updatedToast = false;
    }
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
    'toast.type': function() {
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
    Modal,
    Toast,
    Pagination,
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
    formatBody: function(body) {
      return body
        .split(' ')
        .slice(0, 20)
        .join(' ');
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
