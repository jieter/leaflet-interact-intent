!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.leafletInteractIntent=e():"undefined"!=typeof global?global.leafletInteractIntent=e():"undefined"!=typeof self&&(self.leafletInteractIntent=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var hoverintent = require('hoverintent');

module.exports = window.L.Control.extend({
    options: {
        clicktoplay: false
    },

    onAdd: function(map) {
        var opts = {
            interval: 200
        };

        var container = L.DomUtil.create('div', 'interaction-intent-control');
        var mask = map._createPane('leaflet-mask', map._container);
        if (this.options.clicktoplay) L.DomUtil.addClass(mask, 'leaflet-playback');

        L.DomEvent.disableScrollPropagation(mask);

        hoverintent(map._container, function() {
            if (!L.DomUtil.hasClass(mask, 'leaflet-playback')) mask.style.display = 'none';
        }, function() {
            mask.style.display = 'block';
        }).options(opts);

        L.DomEvent.addListener(mask, 'click', function() {
            L.DomUtil.removeClass(mask, 'leaflet-playback');
            mask.style.display = 'none';
        });
        return container;
    }
});

},{"hoverintent":2}],2:[function(require,module,exports){
(function(global){var hoverintent=function(el,over,out){var x,y,pX,pY;var h={},state=0,timer=0;var options={sensitivity:7,interval:100,timeout:0};var defaults=function(opt){options=merge(opt||{},options)};var merge=function(obj){for(var i=1;i<arguments.length;i++){var def=arguments[i];for(var n in def){if(obj[n]===undefined)obj[n]=def[n]}}return obj};var addEvent=function(object,event,method){if(object.attachEvent){object["e"+event+method]=method;object[event+method]=function(){object["e"+event+method](window.event)};object.attachEvent("on"+event,object[event+method])}else{object.addEventListener(event,method,false)}};var removeEvent=function(object,event,method){if(object.detachEvent){object.detachEvent("on"+event,object[event+method]);object[event+method]=null}else{object.removeEventListener(event,method,false)}};var track=function(e){x=e.pageX;y=e.pageY};var delay=function(el,outEvent,e){if(timer)timer=clearTimeout(timer);state=0;return outEvent.call(el,e)};var dispatch=function(e,event,over){var el=e.currentTarget;var tracker=function(){track(e)};if(timer)timer=clearTimeout(timer);if(over){pX=e.pageX;pY=e.pageY;addEvent(el,"mousemove",tracker);if(state!==1){timer=setTimeout(function(){compare(el,event,e)},options.interval)}}else{removeEvent(el,"mousemove",tracker);if(state===1){timer=setTimeout(function(){delay(el,event,e)},options.timeout)}}return this};var compare=function(el,overEvent,e){if(timer)timer=clearTimeout(timer);if(Math.abs(pX-x)+Math.abs(pY-y)<options.sensitivity){state=1;return overEvent.call(el,e)}else{pX=x;pY=y;timer=setTimeout(function(){compare(el,overEvent,e)},options.interval)}};h.options=function(opt){defaults(opt)};var dispatchOver=function(e){dispatch(e,over,true)};var dispatchOut=function(e){dispatch(e,out)};h.remove=function(){if(!el)return;removeEvent(el,"mouseover",dispatchOver);removeEvent(el,"mouseout",dispatchOut)};if(el){addEvent(el,"mouseover",dispatchOver);addEvent(el,"mouseout",dispatchOut)}defaults();return h};global.hoverintent=hoverintent;if(typeof module!=="undefined")module.exports=hoverintent})(this);
},{}]},{},[1])
(1)
});
;