
# DatadomeBreaker

## Slider Event 
### MouseDown/TouchStart
```js
function(n) {
  if (!t[['\x73\x75\x62\x6d\x69\x74\x74\x65\x64']] && !t[['\x73\x6c\x69\x64\x65\x72\x54\x65\x78\x74']][
      ['\x63\x6c\x61\x73\x73\x4c\x69\x73\x74']
    ][
      ['\x63\x6f\x6e\x74\x61\x69\x6e\x73']
    ]('\x74\x65\x78\x74\x2d\x64\x61\x6e\x67\x65\x72')) {
    a = n[['\x70\x61\x67\x65\x59']] == n[['\x73\x63\x72\x65\x65\x6e\x59']] && n[['\x70\x61\x67\x65\x58']] == n[['\x73\x63\x72\x65\x65\x6e\x58']];
    var e = void 0 !== n[['\x74\x6f\x75\x63\x68\x65\x73']] ? n[['\x74\x6f\x75\x63\x68\x65\x73']][0] : n;
    i = e[['\x63\x6c\x69\x65\x6e\x74\x58']];
    var o = t[['\x73\x6c\x69\x64\x65\x72']][
      ['\x67\x65\x74\x42\x6f\x75\x6e\x64\x69\x6e\x67\x43\x6c\x69\x65\x6e\x74\x52\x65\x63\x74']
    ]();
    r = Math[['\x66\x6c\x6f\x6f\x72']](e[['\x63\x6c\x69\x65\x6e\x74\x58']] - o[['\x6c\x65\x66\x74']]), c = Math[['\x66\x6c\x6f\x6f\x72']](e[['\x63\x6c\x69\x65\x6e\x74\x59']] - o[['\x74\x6f\x70']]), u = !0, t[['\x72\x65\x73\x65\x74\x41\x6e\x64\x53\x74\x61\x72\x74\x52\x65\x74\x72\x79\x54\x69\x6d\x65\x6f\x75\x74']](), null == t[['\x63\x68\x61\x6c\x6c\x65\x6e\x67\x65\x53\x74\x61\x72\x74\x54\x69\x6d\x65']] && (t[['\x63\x68\x61\x6c\x6c\x65\x6e\x67\x65\x53\x74\x61\x72\x74\x54\x69\x6d\x65']] = Date[['\x6e\x6f\x77']]());
  }
}
```
**TRAD:**
- t = form 
- n = 
```js
function mousedown(n) {
	if (!t[['submitted']] && !t[['sliderText']][
		['classList']
	][
		['contains']
	]('text-danger')) {
		  a = n[['pageY']] == n[['screenY']] && n[['pageX']] == n[['screenX']];
		  var e = void 0 !== n[['touches']] ? n[['touches']][0] : n;
		  i = e[['clientX']];
		  var o = t[['slider']][
			['getBoundingClientRect']
		  ]();
		  r = Math[['floor']](e[['clientX']] - o[['left']]), c = Math[['floor']](e[['clientY']] - o[['top']]), u = !0, t[['resetAndStartRetryTimeout']](), null == t[['challengeStartTime']] && (t[['challengeStartTime']] = Date[['now']]());
		
    }
}
```

## Captcha information 
- L 6279 to 6313 
```js
var captcha = sliderCaptcha({
  id: 'ddv1-captcha-container',
  audioId: 'captcha__audio',
  repeatIcon: 'fa fa-redo',
  captchaChallengeSeed: 'd076708d29f8265d9c280586be38a7ea',
  captchaChallengePath: 'https://dd.prod.captcha-delivery.com/image/2024-03-20/d076708d29f8265d9c280586be38a7ea.jpg',
  captchaAudioChallenge: '1f470e8e55580c3302c744303c080422',
  captchaAudioChallengePath: 'https://dd.prod.captcha-delivery.com/audio/2024-03-20/fr/1f470e8e55580c3302c744303c080422.wav',
  width: 280,   // NOT CHANGE
  height: 155,  // NOT CHANGE
  sliderL: 42,  // ?
  sliderR: 9,   // ?
  offset: 5,    // ?
  maxLoadCount: 3, // ? 
  rt: 15,// ? 
  imagePath: '/images-encoded',
  labels: {
    title: 'Complétez le CAPTCHA.',
    puzzleLoading: 'Chargement...',
    puzzleIntro: 'Glissez vers la droite pour compléter le puzzle.',
    puzzleFailure: 'La position du curseur n&#39;est pas correcte.',
    puzzleSuccess: 'Puzzle résolu en ## secondes.',
    puzzleRetry: 'Réessayer',
    puzzleRetryHidden: 'Réessayer la vérification',
    audioIntro: 'Veuillez saisir les chiffres que vous entendez.',
    audioPlay: 'Écoutez les chiffres à écrire',
    audioVerify: 'Vérifier',
    audioFailure: 'Réponse incorrecte.',
    audioSuccess: 'Défi audio résolu.',
    switchToPuzzle: 'Passez à la vérification visuelle',
    switchToAudio: 'Passez à la vérification audio',
    reload: 'Recharger la vérification',
    offline: 'Pas d&#39;accès internet'
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var responseType = 'captcha';
  if (window.parent && window.parent.postMessage) {
    window.parent.postMessage(JSON.stringify({
      eventType: 'load',
      'responseType': responseType,
      'responseUrl': window.location.href
    }), '*');
  }
});

```
- L 73 to 193
```js
window.ddExecuteCaptchaChallenge('2mkUWwj98V5zlbbJ6zflawH9L4PKVkv5yMvUUpqq0jtQGevmWXJqvVWMw3UHpjf7efM_q0r~XiYgl4jJfwg54xJRyS0dIDAQyUBOI9lGW3KzuxaDW_pty7fBANu9zDdv', 10);
var startTime = Date.now();
var ddm = {
  cid: '2mkUWwj98V5zlbbJ6zflawH9L4PKVkv5yMvUUpqq0jtQGevmWXJqvVWMw3UHpjf7efM_q0r~XiYgl4jJfwg54xJRyS0dIDAQyUBOI9lGW3KzuxaDW_pty7fBANu9zDdv',
  hash: 'F86E91876BC172D9F6A12DDC2B3351',
  ua: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/113.0',
  referer: 'https://www.coursesu.com/on/demandware.store/Sites-DigitalU-Site',
  s: '44423'
};
window.captchaCallback = function () {
  var cid = ddm.cid;
  var hash = ddm.hash;
  if (window.ga && ga.create) {
    ga('send', 'event', 'Challenge', 'Access to website', 'JSKey: ' + hash + ' - ClientId: ' + cid);
  }
  var re = new RegExp('datadome=([^;]+)');
  var value = re.exec(document.cookie);
  var ccid = (value != null) ? unescape(value[1]) : null;
  var parentFrameUrl = (window.location != window.parent.location) ? document.referrer : document.location.href;
  var url = '/captcha/check?';
  var getRequest = 'cid=' + encodeURIComponent(cid);
  getRequest += '&icid=' + encodeURIComponent('AHrlqAAAAAMAi1&amp;#x2d;gPZ0eD5AAW61dew==');
  getRequest += '&ccid=' + encodeURIComponent('');
  getRequest += '&userEnv=' + encodeURIComponent('a5e1f72a7ffc90dabefe23ecdf52e832d7505cd7053bf26100827f85f4ccb246');
  getRequest += '&ddCaptchaChallenge=' + encodeURIComponent('d076708d29f8265d9c280586be38a7ea');
  if (window.captchaResponse) {
    getRequest += '&ddCaptchaResponse=' + encodeURIComponent(window.captchaResponse);
  } else if (window.captchaEncodedPayload) {
    getRequest += '&ddCaptchaEncodedPayload=' + encodeURIComponent(window.captchaEncodedPayload);
  }
  getRequest += '&ddCaptchaEnv=' + encodeURIComponent('565beaec541b9042afcf99c46c180caa43024a86d1fc07a37c558432aa6d63a5bce029b0b4e15ee1b413bbf1a5b63791144b80ad73b427ae166e5d3d8e34fad9f5b12015d320c061250451daa7ffd32c');
  getRequest += '&ddCaptchaAudioChallenge=' + encodeURIComponent('1f470e8e55580c3302c744303c080422');
  getRequest += '&hash=' + encodeURIComponent(hash);
  getRequest += '&ua=' + encodeURIComponent(ddm.ua);
  getRequest += '&referer=' + encodeURIComponent(ddm.referer);
  getRequest += '&parent_url=' + encodeURIComponent(parentFrameUrl);
  getRequest += '&x-forwarded-for=' + encodeURIComponent('IP_ADDR'); // "IP_ADDR HIDE MY IP"
  if (window.ddCaptchaChallenge) {
    getRequest += '&captchaChallenge=' + encodeURIComponent(window.ddCaptchaChallenge);
  }
  getRequest += '&s=' + encodeURIComponent(ddm.s);
  getRequest += '&ir=' + encodeURIComponent('');
  var request = new XMLHttpRequest();
  request.open('GET', url + getRequest, true
  );
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.onload = function () {
    function extractOriginFromUrl(url) {
      var pathArray = url.split('/');
      // `pathArray[1]` should be empty string if referer contains protocol. use it!
      if (pathArray.length >= 3 && pathArray[1] === '') {
        return pathArray[0] + '//' + pathArray[2];
      }
      return '*';
    }
    if (this.status >= 200 && this.status < 400) {
      // Track captcha passed
      var element = document.getElementById('analyticsCaptchaPassed');
      if (element) {
        element.setAttribute('data-analytics-captcha-passed', 'true');
      }
      var cid = '2mkUWwj98V5zlbbJ6zflawH9L4PKVkv5yMvUUpqq0jtQGevmWXJqvVWMw3UHpjf7efM_q0r~XiYgl4jJfwg54xJRyS0dIDAQyUBOI9lGW3KzuxaDW_pty7fBANu9zDdv';
      var cookie = cid;
      var reloadHref = 'https://www.coursesu.com/on/demandware.store/Sites-DigitalU-Site';
      var resElement = new DOMParser().parseFromString(reloadHref, 'text/html');
      if (resElement) {
        reloadHref = resElement.documentElement.textContent;
      }
      if (window.parent && window.parent.postMessage && this.responseText !== undefined) {
        var json = JSON.parse(this.responseText);
        if (json.hasOwnProperty('cookie') && json.cookie !== null) {
          cookie = json.cookie;
          var origin = '*';
          // we can't use `window.parent.location.origin` here because access from another origin to `window.parent.location` raises a DOMException
          // except write a new location but it isn't our case.
          // get it from refrerer by hand
          if (document.referrer) {
            origin = extractOriginFromUrl(document.referrer);
            if (origin === document.location.origin) {
              // In case of XHR's blocked request, after the retry, the origin is lost, we must send
              // the message globally.
              origin = '*';
            }
          }
          window.parent.postMessage(JSON.stringify({
            'cookie': json.cookie,
            'url': reloadHref,
            'eventType': 'passed',
            'responseType': 'captcha'
          }), origin);
        }
      } else {
        // Fallback reload if postMessage does not exists
        setTimeout(function () {
          window.top.location.href = reloadHref;
        }, 7000);
      }      // to prevent race condition with postMessage that should setup a cookie
      // adds some sleep for refresh logic

      setTimeout(function () {
        if (window.android && window.android.onCaptchaSuccess) {
          window.android.onCaptchaSuccess(cookie);
          return;
        }
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.onCaptchaSuccess && window.webkit.messageHandlers.onCaptchaSuccess.postMessage) {
          window.webkit.messageHandlers.onCaptchaSuccess.postMessage(cookie);
          return;
        }
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
          window.ReactNativeWebView.postMessage(cookie);
        }
      }, 500);
    } else {
      setTimeout(function () {
        // Reload compatible with IE 11
        window.location = window.location;
      }, 2000);
    }
  };
  request.send();
}// HELPERS
```
