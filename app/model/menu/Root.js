Ext.define('Learn.model.menu.Root', {
	extend: 'Ext.data.Model',

	uses: [
		'Learn.model.menu.Item'
	],

	idProperty: 'id',

	fields: [
		{
			name: 'text'
		}, {
			name: 'iconCls'
		}, {
			name: 'id'
		}
	],

	hasMany: {
		model: 'Learn.model.menu.Item',
		foreignKey: 'parent_id',
		name: 'items'
	}
});