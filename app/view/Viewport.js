Ext.define('Learn.view.Viewport', {
	extend: 'Ext.container.Viewport',
	alias: 'widget.mainviewport',

	requires: [
		'Learn.view.Header'
	],

	layout: 'border',

	items: [
		{
			xtype: 'appheader',
			region: 'north'
		}, {
			// xtype: 'container',
			region: 'west',
			title: 'nav',
			width: 200,
			collapsible: true,
			split: true
		}, {
			xtype: 'tabpanel',
			region: 'center',
			items: [
				{
					title: 'Dashboard',
					iconCls: 'house',
					html: 'This is the dashboard.'
				}
			]
		// }, {
		// 	xtype: 'component',
		// 	region: 'south',
		// 	// ui: 'footer',
		// 	style: 'border-top: 1px solid #cbcbcb;',
		// 	html: '<div id="footer"><p>Mastering ExtJS book - Loiane Groner - http://packtpub. com</p></div>'
		}
	]
});