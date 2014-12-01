Ext.application({
	name: 'Learn',

	splashscreen: {},

	enableQuickTips: true,

	views: [
		'Login',
		'Header',
		'authentication.CapsLockTooltip'
	],

	controllers: [
		'Login',
		'TranslationManager'
	],

	init: function() {
		splashscreen = Ext.getBody().mask('Loading application...', 'splashscreen');
		splashscreen.addCls('splashscreen');

		var apiLoad = new Ext.util.DelayedTask(function() {
			Ext.dom.Element.query('.x-mask-msg.splashscreen .x-mask-msg-text')[0].innerHTML = 'Loading Core API...';
		});

		var uiLoad = new Ext.util.DelayedTask(function() {
			Ext.dom.Element.query('.x-mask-msg.splashscreen .x-mask-msg-text')[0].innerHTML = 'Loading UI Components...';
		});

		var init = new Ext.util.DelayedTask(function() {
			Ext.dom.Element.query('.x-mask-msg.splashscreen .x-mask-msg-text')[0].innerHTML = 'Initializing...';
		});

		apiLoad.delay(500);
		uiLoad.delay(1000);
		init.delay(1500);

		// Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
		// 	cls: 'x-splash-icon'
		// });
	},

	launch: function() {
		var task = new Ext.util.DelayedTask(function() {
			splashscreen.fadeOut({
				duration: 1000,
				remove: true
			});

			splashscreen.next().fadeOut({
				duration: 1000,
				remove: true,
				listeners: {
					afteranimate: function(el, startTime, eOpts) {
						Ext.widget('login');
					}
				}
			});
		});

		task.delay(2000);

	}
});