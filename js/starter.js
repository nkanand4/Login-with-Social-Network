/**
 * This file is the starting point.
 * DEFINE YOUR API keys here.
 */
var MY={
		FB: {
			appid: ''
		}
};
window.fbAsyncInit = function() {
	FB.init({
    	appId      : MY.FB.appid, // App ID
    	//channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
    	status     : true, // check login status
    	cookie     : true, // enable cookies to allow the server to access the session
    	xfbml      : true  // parse XFBML
	});
	MY.app.ready();
// Additional initialization code here
};

MY.app = (function() {
	
	var log=window.logger, 
	isUserLoggedIn,
	doFBML,
	displayAccessButton,
	noop,
	onLogin,
	onDeny,
	onLogout,
	token,
	me;
	
	isUserLoggedIn = function () {
		FB.getLoginStatus(displayAccessButton);
	};
	
	doFBML = function(elem, fbml) {
		elem.innerHTML = fbml;
		FB.XFBML.parse(elem);
	};
	
	displayAccessButton = function(response) {
		log(response);
		var isFBMLused = false;
		//response.status='unknown' // not signed in
		//response.status='connected' // signed in on facebook
		//response.status='not_authorized' // signed in on facebook but not authorize
		me = response.authResponse !== null ? response.authResponse.userID : 0;
		if (response.status === 'connected') {
			token = response.authResponse.accessToken;
			FB.api('/me', function(r) {
				onLogin.call(MY.app, r);
			});
		  } else if (response.status === 'not_authorized') {
		  } else {
			  // get login button to display
			  onLogout.call(MY.app);
		  }
	};
	
	noop = onLogin = OnDeny = onLogout = function() {log(arguments);};
	
	return {
		setup: function(options) {
			onLogin = options.onLogin || onLogin;
			onDeny = options.onDeny || onDeny;
			onLogout = options.onLogout || onLogout;
			return this;
		},
		init: function() {
			// create fb-root
			var fbroot=document.createElement('div');
			fbroot.setAttribute('id', 'fb-root');
			document.getElementsByTagName('body')[0].appendChild(fbroot);
			  // Load the SDK Asynchronously
			(function(d){
				var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('head')[0];
				if (d.getElementById(id)) {return;}
				js = d.createElement('script'); js.id = id; js.async = true;
				js.src = "//connect.facebook.net/en_US/all.js";
				ref.parentNode.insertBefore(js, ref);
			}(document));
		},
		ready: function() {
			isUserLoggedIn();
			FB.Event.subscribe('auth.authResponseChange', displayAccessButton);
		},
		doFBML: function(elem, fbml) {
			doFBML(elem, fbml);
		}
		
	};
})();