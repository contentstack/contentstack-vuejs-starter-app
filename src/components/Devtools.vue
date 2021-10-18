<template>
  <div
    id="staticBackdrop"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabIndex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="staticBackdropLabel" class="modal-title">Json Response</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <pre id="jsonViewer"></pre>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn primary-btn" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import JsonViewer from 'json-viewer-js';

export default {
  computed: {
    response() {
      const { header, footer, page, blogPost } = this.$store.state;
      const response = {
        headers: header || null,
        footer: footer || null
      };
      page && (response.page = page);
      blogPost && (response.blog_post = blogPost);
      return response;
    }
  },
  mounted() {
    const jsonViewer = document.getElementById('jsonViewer');
    new JsonViewer({
      container: jsonViewer,
      data: JSON.stringify(this.response),
      theme: 'light',
      expand: false
    });
  }
};
</script>
