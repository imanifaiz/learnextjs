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
			xtype: 'mainmenu',
			region: 'west',
			width: 200,
			collapsible: false,
			split: true,
			resizeable: false
		}, {
			xtype: 'mainpanel',
			region: 'center'
		// }, {
		// 	xtype: 'component',
		// 	region: 'south',
		// 	// ui: 'footer',
		// 	style: 'border-top: 1px solid #cbcbcb;',
		// 	html: '<div id="footer"><p>Mastering ExtJS book - Loiane Groner - http://packtpub. com</p></div>'
		}
	]
});