<template>
  <Layout>
    <h2>Edit Article</h2>
    <form @submit.prevent="submit">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label for="title" :class="{ 'text-danger': $v.title.$error }">Title</label>
            <input
              type="text"
              :class="[ 'form-control', { 'is-invalid': $v.title.$error }]"
              id="title"
              placeholder="Title"
              v-model="$v.title.$model"
            />
            <div
              class="invalid-feedback"
              v-if="!$v.title.required && $v.title.$dirty"
            >This field is required.</div>
          </div>
          <div class="form-group">
            <label for="desc" :class="{ 'text-danger': $v.desc.$error }">Description</label>
            <input
              type="text"
              :class="[ 'form-control', { 'is-invalid': $v.desc.$error }]"
              id="desc"
              placeholder="Description"
              v-model="$v.desc.$model"
            />
            <div
              class="invalid-feedback"
              v-if="!$v.desc.required && $v.desc.$dirty"
            >This field is required.</div>
          </div>
          <div class="form-group">
            <label for="body" :class="{ 'text-danger': $v.body.$error }">Body</label>
            <textarea
              :class="[ 'form-control', { 'is-invalid': $v.body.$error }]"
              id="body"
              rows="5"
              v-model="$v.body.$model"
            ></textarea>
            <div
              class="invalid-feedback"
              v-if="!$v.body.required && $v.body.$dirty"
            >This field is required.</div>
          </div>
          <BaseButton btnType="submit" btnClass="btn btn-primary" :isLoading="getUpdateStatus == 'loading'">Submit</BaseButton>
        </div>
        <div class="col-lg-3">
          <div class="form-group">
            <label for="tag">Tags</label>
            <input
              type="text"
              class="form-control"
              id="tag"
              placeholder="New Tag"
              @keydown.enter.prevent="addTag"
            />
          </div>
          <div class="tag-list">
            <Loading :isShow="getTagsStatus == 'loading'" />
            <div class="form-group form-check" v-for="(tag, i) in getTags" :key="i">
              <input
                type="checkbox"
                class="form-check-input"
                :id="`checkbox-${i}`"
                :value="tag"
                v-model="checkedTags"
              />
              <label class="form-check-label" :for="`checkbox-${i}`">{{ tag }}</label>
            </div>
          </div>
        </div>
      </div>
    </form>
  </Layout>
</template>

<script>
import Layout from '../layouts/Layout';
import BaseButton from '../components/BaseButton';
import Loading from '../components/Loading'
import { required } from 'vuelidate/lib/validators';
import { mapGetters, mapActions } from 'vuex';
import api from '../api/api'

export default {
  metaInfo: {
    title: 'Edit Article'
  },
  data() {
    return {
      title: '',
      desc: '',
      body: '',
      tags: this.getTags,
      checkedTags: [],
    };
  },
  computed: {
  ...mapGetters({
    getTags: 'articles/getTags',
    getTagsStatus: 'articles/getTagsStatus',
    getUpdateStatus: 'articles/getUpdateStatus'
  })
  },
  validations: {
    title: {
      required,
    },
    desc: {
      required,
    },
    body: {
      required,
    },
  },
  created() {
    this.fetchEditedData();
    this.fetchTags();
  },
  methods: {
    ...mapActions({
      createArticle: 'articles/CREATE_ARTICLE',
      fetchTags: 'articles/FETCH_TAGS',
      updateArticle: 'articles/UPDATE_ARTICLE'
    }),
    submit: function() {
      this.$v.$touch();
      if(!this.$v.$invalid) {
        this.updateArticle({
          slug: this.$route.params.slug,
          title: this.title,
          desc: this.desc,
          body: this.body,
          tags: this.checkedTags
        }).then(res => {
          this.$router.push({ 
            name: 'Articles', 
            params: {
              updated: true
            }
          });
        }).catch(err => {
          console.log(err);
        })
      }
    },
    addTag: function(e) {
      this.getTags.push(e.target.value);
      this.checkedTags.push(e.target.value);
      e.target.value = '';
      this.getTags.sort();
    },
    fetchEditedData: function() {
      api.get(`/articles/${this.$route.params.slug}`).then(res =>{
        this.title = res.data.article.title;
        this.desc = res.data.article.description;
        this.body = res.data.article.body;
      })
    }
  },
  components: {
    Layout,
    BaseButton,
    Loading
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin: 30px 0;
}
.btn {
  min-width: 7rem;
}
</style>