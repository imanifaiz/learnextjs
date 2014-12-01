Ext.define('Learn.view.Login', {
	extend: 'Ext.window.Window',
	alias: 'widget.login',
	requires: ['Learn.view.Translation'],
	autoShow: true,
	height: 190,
	width: 360,
	layout: {
		type: 'fit'
	},
	iconCls: 'key',
	title: translations.login,
	closeAction: 'hide',
	closable: false,

	items: [
		{
			xtype: 'form', // #12
			frame: false, // #13
			bodyPadding: 15, // #14
			defaults: { // #15
				xtype: 'textfield', // #16
				anchor: '100%', // #17
				labelWidth: 60, // #18
				allowBlank: false, // #20
				vtype: 'alphanum', // #21
				minLength: 3, // #22
				msgTarget: 'under' // #23
			},
			items: [
				{
					name: 'user',
					fieldLabel: translations.user,
					maxLength: 25,
					value: 'loiane'
				}, {
					inputType: 'password', // #19
					name: 'password',
					fieldLabel: translations.password,
					maxLength: 15,
					enableKeyEvents: true,
					id:'password',
					value: '123456'
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					ui: 'footer',
					dock: 'bottom',
					items: [
						{
							xtype: 'translation'
						}, '->', {
							xtype: 'button', // #25
							itemId: 'cancel',
							iconCls: 'cancel',
							text: translations.cancel
						}, {
							xtype: 'button', // #26
							itemId: 'submit',
							formBind: true, // #27
							iconCls: 'key_go',
							text: translations.submit
						}
					]
				}
			]
		}
	]
});