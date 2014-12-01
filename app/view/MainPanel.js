Ext.define('Learn.view.MainPanel', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.mainpanel',

	activeTab: 0,

	items: [
		{
			xtype: 'panel',
			closable: false,
			iconCls: 'house',
			title: 'Dashboard'
		}
	]
});