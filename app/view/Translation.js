Ext.define('Learn.view.Translation', {
	extend: 'Ext.button.Split',
	alias: 'widget.translation',

	menu: Ext.create('Ext.menu.Menu', {
		items: [
			{
				xtype: 'menuitem',
				iconCls: 'en',
				text: 'English'
			}, {
				xtype: 'menuitem',
				iconCls: 'es',
				text: 'Espanol'
			}, {
				xtype: 'menuitem',
				iconCls: 'br',
				text: 'Portugues'
			}
		]
	})
});