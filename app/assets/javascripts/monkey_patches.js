Backbone.Collection.prototype.findToFetch = function(id) {
	var model = this.get(id)
	if (!model) {
		model = new this.model({id: id}, {notAdding: true})
		this.add(model)
	}
	model = this.get(id)
	return model
}