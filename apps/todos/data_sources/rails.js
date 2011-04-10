// ==========================================================================
// Project:   Todos.RailsDataStore
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Todos */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/

Todos.RailsDataSource = SC.DataSource.extend(
/** @scope Todos.RailsDataStore.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  //

  fetch: function(store, query) {
    SC.Request.getUrl('/%@/'.fmt(query.recordType.pluralResourcePath))
      .json()
      .notify(this, 'fetchDidComplete', store, query)
      .send();

    return YES;
  },

  fetchDidComplete: function(response, store, query) {
    if(SC.ok(response)) {
      var recordType = query.get('recordType'),
          records = response.get('body');
      store.loadRecords(recordType, records);
      store.dataSourceDidFetchQuery(query);
    } else {
      store.dataSourceDidErrorQuery(query, response);
    }
  },

  updateRecord: function(store, storeKey) {
    console.log("updateRecord");
    var recordType = store.recordTypeFor(storeKey),
        id = store.idFor(storeKey),
        data = store.readDataHash(storeKey);

    SC.Request.putUrl("/%@/%@".fmt(recordType.resourcePath, id))
      .notify(this, 'updateRecordDidComplete', store, storeKey, id)
      .json().send(data);

    return YES;
  },

  updateRecordDidComplete: function(response, store, storeKey, id) {
    if(SC.ok(response) && response.get('body').status === "OK") {
      // Tell the store that we have successfully updated
      store.dataSourceDidComplete(storeKey);
    } else {
      // Tell the store that your server returned an error
      store.dataSourceDidError(storeKey, response);
    }
  },
  // ..........................................................
  // RECORD SUPPORT
  //
  retrieveRecord: function(store, storeKey) {
    var recordType = store.recordTypeFor(storeKey),
        id = store.idFor(storeKey),
        data = store.readDataHash(storeKey);

    SC.Request.getUrl("/%@/%@".fmt(recordType.resourcePath, id))
      .notify(this, 'retrieveRecordDidComplete', store, storeKey, id)
      .json().send(data);

    return YES;
  },

  retrieveRecordDidComplete: function(response, store, storeKey, id) {
    if(SC.ok(response) && response.get('body').status === "OK") {
      // Tell the store that we have successfully updated
      store.dataSourceDidComplete(storeKey,
                                  response.get('body').record);
    } else {
      // Tell the store that your server returned an error
      store.dataSourceDidError(storeKey, response);
    }
  },

  createRecord: function(store, storeKey) {
    var recordType = store.recordTypeFor(storeKey),
        data = store.readDataHash(storeKey);

    SC.Request.postUrl("/%@".fmt(recordType.pluralResourcePath))
      .notify(this, 'createRecordDidComplete', store, storeKey)
      .json().send(data);

    return YES;
  },

  createRecordDidComplete: function(response, store, storeKey) {
    var body = response.get('body');
    if(SC.ok(response) && body.status === "OK") {
      // Tell the store that we have successfully updated
      store.dataSourceDidComplete(storeKey, null, body.id);
    } else {
      // Tell the store that your server returned an error
      store.dataSourceDidError(storeKey, response);
    }
  },

  destroyRecord: function(store, storeKey) {
    var recordType = store.recordTypeFor(storeKey),
        id = store.idFor(storeKey);

    SC.Request.deleteUrl("/%@/%@".fmt(recordType.resourcePath, id))
      .notify(this, 'destroyRecordDidComplete', store, storeKey)
      .json().send();

    return YES;
  },

  destroyRecordDidComplete: function(response, store, storeKey) {
    var body = response.get('body');
    if(SC.ok(response) && body.status === "OK") {
      // Tell the store that we have successfully updated
      store.dataSourceDidDestroy(storeKey);
    } else {
      // Tell the store that your server returned an error
      store.dataSourceDidError(storeKey, response);
    }
  }
}) ;

