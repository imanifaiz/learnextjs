var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en';
var file = 'translations/' + lang + '.js';
var extjsFile = '/ext-5.0.1/build/packages/ext-locale/build/ext-locale-' + lang + '.js';

document.write('<script type="text/javascript" src="' + file + '"></script>');
document.write('<script type="text/javascript" src="' + extjsFile + '"></script>');