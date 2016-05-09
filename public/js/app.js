var app = {
	models: {},
	collections: {},
	views: {}
};

$(function(){
	app.searchContainer = new app.views.SearchContainer();
	app.searchContainer.render();

	app.studentsCollection = new app.collections.Students();

	app.studentsView = new app.views.Students({
		collection: app.studentsCollection
	});
	app.studentsView.render();

	app.searchContainer.doSearch();
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
				console.log(data);
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
		this.$el.siblings().removeClass('active');
		this.$el.addClass('active');

		this.$el.siblings().find('span.glyphicon').remove();
		this.$('td:last').append($("<span class='glyphicon glyphicon-chevron-right'></span>"));

		var detailTemplate = _.template(studentDetailsTemplate);
		$('.detail-view').html(detailTemplate(this.model.toJSON()));
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
