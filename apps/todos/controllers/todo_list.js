// ==========================================================================
// Project:   Todos.todoListController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Todos */

/** @class

 (Document Your Controller Here)

 @extends SC.ArrayController
 */
Todos.todoListController = SC.ArrayController.create(
  SC.CollectionViewDelegate, {
    summary: function() {
      var len = this.get('length'), ret ;

      if (len && len > 0) {
        ret = len === 1 ? "1 todo" : "%@ todos".fmt(len);
      } else ret = "No todos";

      return ret;
    }.property('length').cacheable(),


    collectionViewDeleteContent: function(view, content, indexes) {
      // destroy the records
      var records = indexes.map(function(idx) {
        return this.objectAt(idx);
      }, this);
      records.invoke('destroy');

      var selIndex = indexes.get('min')-1;
      if (selIndex<0) selIndex = 0;
      this.selectObject(this.objectAt(selIndex));
    },

    addTodo: function() {
      var todo;

      todo = Todos.store.createRecord(Todos.Todo, {
        "title": "New Todo",
        "isDone": false
      });

      this.selectObject(todo);

      this.invokeLater(function() {
        var contentIndex = this.indexOf(todo);
        var list = Todos.mainPage.getPath('mainPane.middleView.contentView');
        var listItem = list.itemViewForContentIndex(contentIndex);
        listItem.beginEditing();
      });

      return YES;
    }
  }) ;
