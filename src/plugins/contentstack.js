// Module dependency
const Contentstack = require('contentstack');

const Stack = Contentstack.Stack(
  process.env.VUE_APP_CONTENTSTACK_API_KEY,
  process.env.VUE_APP_CONTENTSTACK_DELIVERY_TOKEN,
  process.env.VUE_APP_CONTENTSTACK_PUBLISH_ENVIRONMENT,
  process.env.VUE_APP_CONTENTSTACK_REGION
);

export default {
  /**
   * This function fetches specific entry which matches params url using where clause
   *
   * @param {*provides content-type uid} contentTypeUid String
   * @param {*provides url to search specific entry} entryUrl String
   * @param {*provides reference field path as an array or a string} referencedFieldPath
   * Array e.g.[`author`, `related_post`] | String e.g. 'related_pages'
   *
   **/

  getEntryByUrl(contentTypeUid, entryUrl, referencedFieldPath) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referencedFieldPath) {
        query.includeReference(referencedFieldPath);
      }
      query.toJSON();
      const data = query.where('url', `${entryUrl}`).find();
      data.then(
        result => {
          resolve(result[0]);
        },
        error => {
          reject(error);
        }
      );
    });
  },

  /**
   * This function fetches all the entries for a specific content-type
   *
   * @param {*provides content-type uid} contentTypeUid String
   * @param {*provides reference field path as an array or a string} referencedFieldPath
   * Array e.g.[`author`, `related_post`] | String e.g. 'related_pages'
   *
   **/

  getEntries(contentTypeUid, referencedFieldPath) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referencedFieldPath) query.includeReference(referencedFieldPath);
      query
        .toJSON()
        .find()
        .then(
          result => {
            resolve(result[0]);
          },
          error => {
            console.log(error);
            reject(error);
          }
        );
    });
  }
};
