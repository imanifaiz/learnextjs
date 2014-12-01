Ext.define('Learn.model.menu.Item', {
	extend: 'Ext.data.Model',

	uses: [
		'Learn.model.menu.Root'
	],

	idProperty: 'id',

	fields: [
		{
			name: 'text'
		}, {
			name: 'iconCls'
		}, {
			name: 'className'
		}, {
			name: 'id'
		}, {
			name: 'parent_id'
		}
	],

	belongsTo: {
		model: 'Learn.model.menu.Root',
		foreignKey: 'parent_id'
	}
});