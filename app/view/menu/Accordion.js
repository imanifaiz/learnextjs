Ext.define('Learn.view.menu.Accordion', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.mainmenu',

	width: 200,
	layout: {
		// layout-specific configs go here
		type: 'accordion',
		animate: true
	},
	collapsible:false,
	resizeable: false,
	hideCollapseTool: false,
	iconCls: 'sitemap',
	title: 'Menu'
});