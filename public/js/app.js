var app = {
	models: {},
	collections: {},
	views: {},
	initialize: function() {
		this.createViews();
		this.loadClasses();
	},
	createViews: function() {
		this.searchContainerView = new this.views.SearchContainer();
		this.searchContainerView.render();

		this.studentsCollection = new this.collections.Students();

		this.studentsView = new this.views.Students({
			collection: this.studentsCollection
		});
		this.studentsView.render();

		this.searchContainerView.doSearch();
	},
	loadClasses: function() {
		// load class data
		$.ajax({
			url: '/api/classes',
			success: function(data) {
				app.classes = data;
			}
		});
	}
};

$(function(){
	app.initialize();
});

app.views.SearchContainer = Backbone.View.extend({
	el: '.search-container',
	events: {
		'click button[type=submit]': 'submitClicked',
		'click button[type=reset]': 'resetClicked'
	},
	template: _.template(searchContainerTemplate),
	render: function() {
		this.$el.html(this.template());
	},
	submitClicked: function(event) {
		event.preventDefault();
		this.doSearch();
	},
	resetClicked: function() {
		this.$('#firstName').val('');
		this.$('#lastName').val('');
		this.doSearch();
	},
	doSearch: function() {
		$.ajax({
			url: '/api/students/search',
			data: {
				first: this.$('#firstName').val(),
				last: this.$('#lastName').val()
			},
			success: function(data) {
				app.studentsCollection.set(data);
			}
		});
	}
});

app.models.Student = Backbone.Model.extend({});

app.collections.Students = Backbone.Collection.extend({
	model: app.models.Student
});

app.views.Student = Backbone.View.extend({
	tagName: 'tr',
	events: {
		'click': 'studentClicked'
	},
	template: _.template(studentSearchResultTemplate),
	initialize: function(options) {
		_.bindAll(this, 'render');
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	studentClicked: function() {
		// update active student
		this.$el.siblings().removeClass('active');
		this.$el.addClass('active');

		// add chevron next to active student
		this.$el.parent().find('span.glyphicon').remove();
		this.$('td:last').append($("<span class='glyphicon glyphicon-chevron-right'></span>"));

		// get student details
		$.ajax({
			url: '/api/students/' + this.model.get('id'),
			success: function(data) {
				// add class names to student data
				data.classes = app.classes;

				// render student details
				var detailTemplate = _.template(studentDetailsTemplate);
				$('.detail-view').html(detailTemplate(data));
			}
		})
	}
});

app.views.Students = Backbone.View.extend({
	el: '.search-results tbody',
	initialize: function(options) {	
		this.collection = options.collection;
		_.bindAll(this, 'render');
		this.collection.bind('reset', this.render);
		this.collection.bind('update', this.render);
	},
	render: function() {
		var element = jQuery(this.el);
		element.empty();
	    this.collection.forEach(function(item) {

			var itemView = new app.views.Student({
				model: item
			});

	    	element.append(itemView.render().el);
	    });

		$('.detail-view').empty();
		
	    return this;		  
	}		
});
