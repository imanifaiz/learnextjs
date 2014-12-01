Ext.define('Learn.store.Menu', {
	extend: 'Ext.data.Store',

	requires: [
		'Learn.model.menu.Root'
	],

	model: 'Learn.model.menu.Root',

	proxy: {
		type: 'ajax',
		url: 'php/menu.php',

		reader: {
			type: 'json',
			rootProperty: 'items'
		}
	}
});