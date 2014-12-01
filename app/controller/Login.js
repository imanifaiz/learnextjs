Ext.define('Learn.controller.Login', {
	extend: 'Ext.app.Controller',

	requires: [
		'Learn.util.MD5',
		'Learn.util.Util',
		'Learn.util.SessionMonitor'
	],

	refs: [
		{
			ref: 'capslockTooltip',
			selector: 'capslocktooltip'
		}
	],

	views: [
		'Login',
		'Header',
		'authentication.CapsLockTooltip'
	],

	init: function(app) {
		this.control({
			'login button#submit': {
				click: this.onSubmitButtonClick
			},
			'login button#cancel': {
				click: this.onCancelButtonClick
			},
			'login form textfield': {
				specialkey: this.onTextfieldSpecialKey
			},
			'login form textfield[name=password]': {
				keypress: this.onTextfieldKeyPress
			},
			'appheader button#logout': {
				click: this.onLogoutButtonClick
			}
		})
	},

	onSubmitButtonClick: function (button, e, options) {
		console.info('Submit button clicked!');
		window.x = button;

		var formPanel = button.up('form'),
			form = formPanel.getForm(),
			login = button.up('login'),
			user = formPanel.down('textfield[name=user]').getValue(),
			password = formPanel.down('textfield[name=password]').getValue();

		password = Learn.util.MD5.encode(password);

		if (form.isValid()) {
			Ext.get(login.getEl()).mask("Authenticating... Please wait...", 'loading');

			Ext.Ajax.request({
				url: 'php/login.php',
				waitMsg: 'Authenticating... Please wait... ',
				params: {
					user: user,
					password: password
				},
				 success: function(conn, response, options, eOpts) {
				 	Ext.get(login.getEl()).unmask();

				 	var result = Learn.util.Util.decodeJSON(conn.responseText);

				 	if (result.success) {
				 		login.close();
				 		Ext.create('Learn.view.Viewport');
				 		Learn.util.SessionMonitor.start();
				 	} else {
				 		Learn.util.Util.showErrorMsg(result.msg);
				 	}
				 },
				 failure: function(conn, response, options, eOpts) {
					Ext.get(login.getEl()).unmask();

				 	Learn.util.Util.showErrorMsg(conn.responseText);
				}
			});

			// form.submit({
			// 	url: 'php/login.php',
			// 	waitMsg: 'Authenticating... Please wait... ',
			// 	params: {
			// 		user: user,
			// 		password: password
			// 	},
			// 	failure: function(conn, response, options, eOpts) {
			// 		Ext.Msg.show({
			// 			title: 'Error!',
			// 			msg: conn.responseText,
			// 			icon: Ext.Msg.ERROR,
			// 			buttons: Ext.Msg.OK
			// 		});
			// 	},
			// 	 success: function(conn, response, options, eOpts) {
			// 	 	var result = Ext.JSON.decode(conn.responseText, true);

			// 	 	if (!result) {
			// 	 		result = {};
			// 	 		result.success = false;
			// 	 		result.msg = conn.responseText;
			// 	 	}

			// 	 	if (result.success) {
			// 	 		login.close();
			// 	 		Ext.create('Learn.view.Viewport');
			// 	 	} else {
			// 	 		Ext.Msg.show({
			// 	 			title: 'Fail!',
			// 	 			msg: result.msg,
			// 	 			icons: Ext.Msg.ERROR,
			// 	 			buttons: Ext.Msg.OK
			// 	 		});
			// 	 	}
			// 	 }
			// });
		}
	},

	onCancelButtonClick: function (button, e, options) {
		console.warn('Cancel button clicked!');
		button.up('form').getForm().reset();
		console.info('Form reset!');
	},

	onTextfieldSpecialKey: function(field, e, options) {
		if (e.getKey() == e.ENTER) {
			var submitButton = field.up('form').down('button#submit');
			submitButton.fireEvent('click', submitButton, e, options);
		}
	},

	onTextfieldKeyPress: function(field, e, options) {
		var charCode = e.getCharCode();

		if ((e.shiftKey && charCode >= 97 && charCode <= 122) ||
			(!e.shiftKey && charCode >= 65 && charCode <= 90)) {

			if (this.getCapslockTooltip() === undefined) {
				Ext.widget('capslocktooltip');
			}

			this.getCapslockTooltip().show();
		} else {
			if (this.getCapslockTooltip() !== undefined) {
				this.getCapslockTooltip().hide();
			}
		}
	},

	onLogoutButtonClick: function(button, e, options) {
		Ext.Ajax.request({
			url: 'php/logout.php',
			success: function(conn, response, options, eOpts) {
				var result = Learn.util.Util.decodeJSON(conn.responseText);

				if (result.success) {
					button.up('mainviewport').destroy();
					window.location.reload();
				} else {
					Learn.util.Util.showErrorMsg(result.msg);
				}
			},
			failure: function(conn, response, options, eOpts) {
				Learn.util.Util.showErrorMsg(conn.responseText);
			}
		});
	}
})