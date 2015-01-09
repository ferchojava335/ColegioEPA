ColegioEPA.SubjectsEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(location) {
        location.save();
        this.get("target").transitionTo("subjects");
      }
    },
      isNew: function() {
        console.log("calculating isNew");
        return this.get('content').get('id');
      }.property()
});

ColegioEPA.SubjectsIndexController = Ember.ArrayController.extend({
      editCounter: function () {
        return this.filterProperty('selected', true).get('length');
      }.property('@each.selected'),

      itemsSelected: function() {
        return this.get("editCounter")>0;
      }.property('editCounter'),
       exitStudent: function() {
        var itemsPresent = this.get('content').get('length') > 0;
        console.log(" +++ Computed locationsPresent prop with value " + itemsPresent);
        return itemsPresent;
      }.property("content.@each"),

    actions: {
        removeItem: function(subject) {
            subject.on("didDelete", this, function() {
                console.log("record deleted");
            });
            subject.destroyRecord();
        },

        removeSelectedLocations: function() {
            arr = this.filterProperty('selected', true);
            if (arr.length==0) {
                output = "nothing selected";
            } else { 
                output = "";
                for (i=0 ; i<arr.length ; i++) { 
                  arr[i].destroyRecord()
                }
            }
        }
    }
});