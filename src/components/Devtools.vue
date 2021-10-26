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
          <pre id="jsonViewer">
            <json-viewer id="jsonViewer">{{response}}</json-viewer>
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import JsonViewer from 'json-viewer-js';
import '@alenaksu/json-viewer';
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
      const jsonData = this.filterObject(response);
      return jsonData;
    }
  },
  methods: {
    filterObject: function(inputObject) {
      const unWantedProps = [
        'uid',
        '_version',
        'ACL',
        '_in_progress',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',
        'publish_details'
      ];
      for (const key in inputObject) {
        unWantedProps.includes(key) && delete inputObject[key];
        if (typeof inputObject[key] !== 'object') {
          continue;
        }
        inputObject[key] = this.filterObject(inputObject[key]);
      }
      return inputObject;
    }
  },
  mounted: function mounted() {
    // const jsonViewer = document.getElementById('jsonViewer');
    let jsonData = this.filterObject(this.response);
    this.response = JSON.stringify(jsonData);
    // try {
    //   new JsonViewer({
    //     container: jsonViewer,
    //     data: jsonData,
    //     theme: 'light',
    //     expand: false
    //   });
    // } catch (error) {
    //   console.error('error', error);
    // }
  }
};
</script>
