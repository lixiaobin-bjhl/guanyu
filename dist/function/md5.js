'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (s) {
  return hex(md51(s));
};

/*!
 * Joseph Myer's md5() algorithm wrapped in a self-invoked function to prevent
 * global namespace polution, modified to hash unicode characters as UTF-8.
 *  
 * Copyright 1999-2010, Joseph Myers, Paul Johnston, Greg Holt, Will Bond <will@wbond.net>
 * http://www.myersdaily.org/joseph/javascript/md5-text.html
 * http://pajhome.org.uk/crypt/md5
 * 
 * Released under the BSD license
 * http://www.opensource.org/licenses/bsd-license
 */

function md5cycle(x, k) {
  var a = x[0],
      b = x[1],
      c = x[2],
      d = x[3];

  a = ff(a, b, c, d, k[0], 7, -680876936);
  d = ff(d, a, b, c, k[1], 12, -389564586);
  c = ff(c, d, a, b, k[2], 17, 606105819);
  b = ff(b, c, d, a, k[3], 22, -1044525330);
  a = ff(a, b, c, d, k[4], 7, -176418897);
  d = ff(d, a, b, c, k[5], 12, 1200080426);
  c = ff(c, d, a, b, k[6], 17, -1473231341);
  b = ff(b, c, d, a, k[7], 22, -45705983);
  a = ff(a, b, c, d, k[8], 7, 1770035416);
  d = ff(d, a, b, c, k[9], 12, -1958414417);
  c = ff(c, d, a, b, k[10], 17, -42063);
  b = ff(b, c, d, a, k[11], 22, -1990404162);
  a = ff(a, b, c, d, k[12], 7, 1804603682);
  d = ff(d, a, b, c, k[13], 12, -40341101);
  c = ff(c, d, a, b, k[14], 17, -1502002290);
  b = ff(b, c, d, a, k[15], 22, 1236535329);

  a = gg(a, b, c, d, k[1], 5, -165796510);
  d = gg(d, a, b, c, k[6], 9, -1069501632);
  c = gg(c, d, a, b, k[11], 14, 643717713);
  b = gg(b, c, d, a, k[0], 20, -373897302);
  a = gg(a, b, c, d, k[5], 5, -701558691);
  d = gg(d, a, b, c, k[10], 9, 38016083);
  c = gg(c, d, a, b, k[15], 14, -660478335);
  b = gg(b, c, d, a, k[4], 20, -405537848);
  a = gg(a, b, c, d, k[9], 5, 568446438);
  d = gg(d, a, b, c, k[14], 9, -1019803690);
  c = gg(c, d, a, b, k[3], 14, -187363961);
  b = gg(b, c, d, a, k[8], 20, 1163531501);
  a = gg(a, b, c, d, k[13], 5, -1444681467);
  d = gg(d, a, b, c, k[2], 9, -51403784);
  c = gg(c, d, a, b, k[7], 14, 1735328473);
  b = gg(b, c, d, a, k[12], 20, -1926607734);

  a = hh(a, b, c, d, k[5], 4, -378558);
  d = hh(d, a, b, c, k[8], 11, -2022574463);
  c = hh(c, d, a, b, k[11], 16, 1839030562);
  b = hh(b, c, d, a, k[14], 23, -35309556);
  a = hh(a, b, c, d, k[1], 4, -1530992060);
  d = hh(d, a, b, c, k[4], 11, 1272893353);
  c = hh(c, d, a, b, k[7], 16, -155497632);
  b = hh(b, c, d, a, k[10], 23, -1094730640);
  a = hh(a, b, c, d, k[13], 4, 681279174);
  d = hh(d, a, b, c, k[0], 11, -358537222);
  c = hh(c, d, a, b, k[3], 16, -722521979);
  b = hh(b, c, d, a, k[6], 23, 76029189);
  a = hh(a, b, c, d, k[9], 4, -640364487);
  d = hh(d, a, b, c, k[12], 11, -421815835);
  c = hh(c, d, a, b, k[15], 16, 530742520);
  b = hh(b, c, d, a, k[2], 23, -995338651);

  a = ii(a, b, c, d, k[0], 6, -198630844);
  d = ii(d, a, b, c, k[7], 10, 1126891415);
  c = ii(c, d, a, b, k[14], 15, -1416354905);
  b = ii(b, c, d, a, k[5], 21, -57434055);
  a = ii(a, b, c, d, k[12], 6, 1700485571);
  d = ii(d, a, b, c, k[3], 10, -1894986606);
  c = ii(c, d, a, b, k[10], 15, -1051523);
  b = ii(b, c, d, a, k[1], 21, -2054922799);
  a = ii(a, b, c, d, k[8], 6, 1873313359);
  d = ii(d, a, b, c, k[15], 10, -30611744);
  c = ii(c, d, a, b, k[6], 15, -1560198380);
  b = ii(b, c, d, a, k[13], 21, 1309151649);
  a = ii(a, b, c, d, k[4], 6, -145523070);
  d = ii(d, a, b, c, k[11], 10, -1120210379);
  c = ii(c, d, a, b, k[2], 15, 718787259);
  b = ii(b, c, d, a, k[9], 21, -343485551);

  x[0] = add32(a, x[0]);
  x[1] = add32(b, x[1]);
  x[2] = add32(c, x[2]);
  x[3] = add32(d, x[3]);
}

function cmn(q, a, b, x, s, t) {
  a = add32(add32(a, q), add32(x, t));
  return add32(a << s | a >>> 32 - s, b);
}

function ff(a, b, c, d, x, s, t) {
  return cmn(b & c | ~b & d, a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
  return cmn(b & d | c & ~d, a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}

function md51(s) {
  // Converts the string to UTF-8 "bytes" when necessary
  if (/[\x80-\xFF]/.test(s)) {
    s = unescape(encodeURI(s));
  }
  var n = s.length,
      state = [1732584193, -271733879, -1732584194, 271733878],
      i;
  for (i = 64; i <= s.length; i += 64) {
    md5cycle(state, md5blk(s.substring(i - 64, i)));
  }
  s = s.substring(i - 64);
  var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (i = 0; i < s.length; i++) {
    tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
  }tail[i >> 2] |= 0x80 << (i % 4 << 3);
  if (i > 55) {
    md5cycle(state, tail);
    for (i = 0; i < 16; i++) {
      tail[i] = 0;
    }
  }
  tail[14] = n * 8;
  md5cycle(state, tail);
  return state;
}

function md5blk(s) {
  /* I figured global was faster.   */
  var md5blks = [],
      i; /* Andy King said do it this way. */
  for (i = 0; i < 64; i += 4) {
    md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
  }
  return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n) {
  var s = '',
      j = 0;
  for (; j < 4; j++) {
    s += hex_chr[n >> j * 8 + 4 & 0x0F] + hex_chr[n >> j * 8 & 0x0F];
  }return s;
}

function hex(x) {
  for (var i = 0; i < x.length; i++) {
    x[i] = rhex(x[i]);
  }return x.join('');
}

/* this function is much faster, so if possible we use it. Some IEs are the
only ones I know of that need the idiotic second function, generated by an
if clause.  */
function add32(a, b) {
  return a + b & 0xFFFFFFFF;
}

if (hex(md51('hello')) != '5d41402abc4b2a76b9719d911017c592') {
  var _add = function _add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF),
        msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xFFFF;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1kNS5qcyJdLCJuYW1lcyI6WyJzIiwiaGV4IiwibWQ1MSIsIm1kNWN5Y2xlIiwieCIsImsiLCJhIiwiYiIsImMiLCJkIiwiZmYiLCJnZyIsImhoIiwiaWkiLCJhZGQzMiIsImNtbiIsInEiLCJ0IiwidGVzdCIsInVuZXNjYXBlIiwiZW5jb2RlVVJJIiwibiIsImxlbmd0aCIsInN0YXRlIiwiaSIsIm1kNWJsayIsInN1YnN0cmluZyIsInRhaWwiLCJjaGFyQ29kZUF0IiwibWQ1YmxrcyIsImhleF9jaHIiLCJzcGxpdCIsInJoZXgiLCJqIiwiam9pbiIsInkiLCJsc3ciLCJtc3ciXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFnTGUsVUFBVUEsQ0FBVixFQUFhO0FBQ3hCLFNBQU9DLElBQUlDLEtBQUtGLENBQUwsQ0FBSixDQUFQO0FBQ0gsQzs7QUFsTEQ7Ozs7Ozs7Ozs7OztBQVlBLFNBQVNHLFFBQVQsQ0FBa0JDLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QjtBQUNwQixNQUFJQyxJQUFJRixFQUFFLENBQUYsQ0FBUjtBQUFBLE1BQWNHLElBQUlILEVBQUUsQ0FBRixDQUFsQjtBQUFBLE1BQXdCSSxJQUFJSixFQUFFLENBQUYsQ0FBNUI7QUFBQSxNQUFrQ0ssSUFBSUwsRUFBRSxDQUFGLENBQXRDOztBQUVBRSxNQUFJSSxHQUFHSixDQUFILEVBQU1DLENBQU4sRUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWVKLEVBQUUsQ0FBRixDQUFmLEVBQXFCLENBQXJCLEVBQXdCLENBQUMsU0FBekIsQ0FBSjtBQUNBSSxNQUFJQyxHQUFHRCxDQUFILEVBQU1ILENBQU4sRUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWVILEVBQUUsQ0FBRixDQUFmLEVBQXFCLEVBQXJCLEVBQXlCLENBQUMsU0FBMUIsQ0FBSjtBQUNBRyxNQUFJRSxHQUFHRixDQUFILEVBQU1DLENBQU4sRUFBU0gsQ0FBVCxFQUFZQyxDQUFaLEVBQWVGLEVBQUUsQ0FBRixDQUFmLEVBQXFCLEVBQXJCLEVBQXlC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QUFEQSxHQUdBLE9BQU9qQyxDQUFQO0FBQ0Q7O0FBRUQsU0FBU0MsR0FBVCxDQUFhRyxDQUFiLEVBQWdCO0FBQ2QsT0FBSyxJQUFJb0IsSUFBSSxDQUFiLEVBQWdCQSxJQUFJcEIsRUFBRWtCLE1BQXRCLEVBQThCRSxHQUE5QjtBQUNBcEIsTUFBRW9CLENBQUYsSUFBT1EsS0FBSzVCLEVBQUVvQixDQUFGLENBQUwsQ0FBUDtBQURBLEdBRUEsT0FBT3BCLEVBQUU4QixJQUFGLENBQU8sRUFBUCxDQUFQO0FBQ0Q7O0FBRUQ7OztBQUdBLFNBQVNwQixLQUFULENBQWVSLENBQWYsRUFBa0JDLENBQWxCLEVBQXFCO0FBQ25CLFNBQVFELElBQUlDLENBQUwsR0FBVSxVQUFqQjtBQUNEOztBQUVELElBQUlOLElBQUlDLEtBQUssT0FBTCxDQUFKLEtBQXNCLGtDQUExQixFQUE4RDtBQUFBLE1BQ25EWSxJQURtRCxHQUM1RCxTQUFTQSxJQUFULENBQWVWLENBQWYsRUFBa0IrQixDQUFsQixFQUFxQjtBQUNuQixRQUFJQyxNQUFNLENBQUNoQyxJQUFJLE1BQUwsS0FBZ0IrQixJQUFJLE1BQXBCLENBQVY7QUFBQSxRQUNJRSxNQUFNLENBQUNqQyxLQUFLLEVBQU4sS0FBYStCLEtBQUssRUFBbEIsS0FBeUJDLE9BQU8sRUFBaEMsQ0FEVjtBQUVBLFdBQVFDLE9BQU8sRUFBUixHQUFlRCxNQUFNLE1BQTVCO0FBQ0QsR0FMMkQ7QUFNN0QiLCJmaWxlIjoibWQ1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBKb3NlcGggTXllcidzIG1kNSgpIGFsZ29yaXRobSB3cmFwcGVkIGluIGEgc2VsZi1pbnZva2VkIGZ1bmN0aW9uIHRvIHByZXZlbnRcbiAqIGdsb2JhbCBuYW1lc3BhY2UgcG9sdXRpb24sIG1vZGlmaWVkIHRvIGhhc2ggdW5pY29kZSBjaGFyYWN0ZXJzIGFzIFVURi04LlxuICogIFxuICogQ29weXJpZ2h0IDE5OTktMjAxMCwgSm9zZXBoIE15ZXJzLCBQYXVsIEpvaG5zdG9uLCBHcmVnIEhvbHQsIFdpbGwgQm9uZCA8d2lsbEB3Ym9uZC5uZXQ+XG4gKiBodHRwOi8vd3d3Lm15ZXJzZGFpbHkub3JnL2pvc2VwaC9qYXZhc2NyaXB0L21kNS10ZXh0Lmh0bWxcbiAqIGh0dHA6Ly9wYWpob21lLm9yZy51ay9jcnlwdC9tZDVcbiAqIFxuICogUmVsZWFzZWQgdW5kZXIgdGhlIEJTRCBsaWNlbnNlXG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL2JzZC1saWNlbnNlXG4gKi9cblxuZnVuY3Rpb24gbWQ1Y3ljbGUoeCwgaykge1xuICAgIHZhciBhID0geFswXSwgYiA9IHhbMV0sIGMgPSB4WzJdLCBkID0geFszXTtcblxuICAgIGEgPSBmZihhLCBiLCBjLCBkLCBrWzBdLCA3LCAtNjgwODc2OTM2KTtcbiAgICBkID0gZmYoZCwgYSwgYiwgYywga1sxXSwgMTIsIC0zODk1NjQ1ODYpO1xuICAgIGMgPSBmZihjLCBkLCBhLCBiLCBrWzJdLCAxNywgNjA2MTA1ODE5KTtcbiAgICBiID0gZmYoYiwgYywgZCwgYSwga1szXSwgMjIsIC0xMDQ0NTI1MzMwKTtcbiAgICBhID0gZmYoYSwgYiwgYywgZCwga1s0XSwgNywgLTE3NjQxODg5Nyk7XG4gICAgZCA9IGZmKGQsIGEsIGIsIGMsIGtbNV0sIDEyLCAxMjAwMDgwNDI2KTtcbiAgICBjID0gZmYoYywgZCwgYSwgYiwga1s2XSwgMTcsIC0xNDczMjMxMzQxKTtcbiAgICBiID0gZmYoYiwgYywgZCwgYSwga1s3XSwgMjIsIC00NTcwNTk4Myk7XG4gICAgYSA9IGZmKGEsIGIsIGMsIGQsIGtbOF0sIDcsIDE3NzAwMzU0MTYpO1xuICAgIGQgPSBmZihkLCBhLCBiLCBjLCBrWzldLCAxMiwgLTE5NTg0MTQ0MTcpO1xuICAgIGMgPSBmZihjLCBkLCBhLCBiLCBrWzEwXSwgMTcsIC00MjA2Myk7XG4gICAgYiA9IGZmKGIsIGMsIGQsIGEsIGtbMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xuICAgIGEgPSBmZihhLCBiLCBjLCBkLCBrWzEyXSwgNywgMTgwNDYwMzY4Mik7XG4gICAgZCA9IGZmKGQsIGEsIGIsIGMsIGtbMTNdLCAxMiwgLTQwMzQxMTAxKTtcbiAgICBjID0gZmYoYywgZCwgYSwgYiwga1sxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XG4gICAgYiA9IGZmKGIsIGMsIGQsIGEsIGtbMTVdLCAyMiwgMTIzNjUzNTMyOSk7XG5cbiAgICBhID0gZ2coYSwgYiwgYywgZCwga1sxXSwgNSwgLTE2NTc5NjUxMCk7XG4gICAgZCA9IGdnKGQsIGEsIGIsIGMsIGtbNl0sIDksIC0xMDY5NTAxNjMyKTtcbiAgICBjID0gZ2coYywgZCwgYSwgYiwga1sxMV0sIDE0LCA2NDM3MTc3MTMpO1xuICAgIGIgPSBnZyhiLCBjLCBkLCBhLCBrWzBdLCAyMCwgLTM3Mzg5NzMwMik7XG4gICAgYSA9IGdnKGEsIGIsIGMsIGQsIGtbNV0sIDUsIC03MDE1NTg2OTEpO1xuICAgIGQgPSBnZyhkLCBhLCBiLCBjLCBrWzEwXSwgOSwgMzgwMTYwODMpO1xuICAgIGMgPSBnZyhjLCBkLCBhLCBiLCBrWzE1XSwgMTQsIC02NjA0NzgzMzUpO1xuICAgIGIgPSBnZyhiLCBjLCBkLCBhLCBrWzRdLCAyMCwgLTQwNTUzNzg0OCk7XG4gICAgYSA9IGdnKGEsIGIsIGMsIGQsIGtbOV0sIDUsIDU2ODQ0NjQzOCk7XG4gICAgZCA9IGdnKGQsIGEsIGIsIGMsIGtbMTRdLCA5LCAtMTAxOTgwMzY5MCk7XG4gICAgYyA9IGdnKGMsIGQsIGEsIGIsIGtbM10sIDE0LCAtMTg3MzYzOTYxKTtcbiAgICBiID0gZ2coYiwgYywgZCwgYSwga1s4XSwgMjAsIDExNjM1MzE1MDEpO1xuICAgIGEgPSBnZyhhLCBiLCBjLCBkLCBrWzEzXSwgNSwgLTE0NDQ2ODE0NjcpO1xuICAgIGQgPSBnZyhkLCBhLCBiLCBjLCBrWzJdLCA5LCAtNTE0MDM3ODQpO1xuICAgIGMgPSBnZyhjLCBkLCBhLCBiLCBrWzddLCAxNCwgMTczNTMyODQ3Myk7XG4gICAgYiA9IGdnKGIsIGMsIGQsIGEsIGtbMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xuXG4gICAgYSA9IGhoKGEsIGIsIGMsIGQsIGtbNV0sIDQsIC0zNzg1NTgpO1xuICAgIGQgPSBoaChkLCBhLCBiLCBjLCBrWzhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xuICAgIGMgPSBoaChjLCBkLCBhLCBiLCBrWzExXSwgMTYsIDE4MzkwMzA1NjIpO1xuICAgIGIgPSBoaChiLCBjLCBkLCBhLCBrWzE0XSwgMjMsIC0zNTMwOTU1Nik7XG4gICAgYSA9IGhoKGEsIGIsIGMsIGQsIGtbMV0sIDQsIC0xNTMwOTkyMDYwKTtcbiAgICBkID0gaGgoZCwgYSwgYiwgYywga1s0XSwgMTEsIDEyNzI4OTMzNTMpO1xuICAgIGMgPSBoaChjLCBkLCBhLCBiLCBrWzddLCAxNiwgLTE1NTQ5NzYzMik7XG4gICAgYiA9IGhoKGIsIGMsIGQsIGEsIGtbMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xuICAgIGEgPSBoaChhLCBiLCBjLCBkLCBrWzEzXSwgNCwgNjgxMjc5MTc0KTtcbiAgICBkID0gaGgoZCwgYSwgYiwgYywga1swXSwgMTEsIC0zNTg1MzcyMjIpO1xuICAgIGMgPSBoaChjLCBkLCBhLCBiLCBrWzNdLCAxNiwgLTcyMjUyMTk3OSk7XG4gICAgYiA9IGhoKGIsIGMsIGQsIGEsIGtbNl0sIDIzLCA3NjAyOTE4OSk7XG4gICAgYSA9IGhoKGEsIGIsIGMsIGQsIGtbOV0sIDQsIC02NDAzNjQ0ODcpO1xuICAgIGQgPSBoaChkLCBhLCBiLCBjLCBrWzEyXSwgMTEsIC00MjE4MTU4MzUpO1xuICAgIGMgPSBoaChjLCBkLCBhLCBiLCBrWzE1XSwgMTYsIDUzMDc0MjUyMCk7XG4gICAgYiA9IGhoKGIsIGMsIGQsIGEsIGtbMl0sIDIzLCAtOTk1MzM4NjUxKTtcblxuICAgIGEgPSBpaShhLCBiLCBjLCBkLCBrWzBdLCA2LCAtMTk4NjMwODQ0KTtcbiAgICBkID0gaWkoZCwgYSwgYiwgYywga1s3XSwgMTAsIDExMjY4OTE0MTUpO1xuICAgIGMgPSBpaShjLCBkLCBhLCBiLCBrWzE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcbiAgICBiID0gaWkoYiwgYywgZCwgYSwga1s1XSwgMjEsIC01NzQzNDA1NSk7XG4gICAgYSA9IGlpKGEsIGIsIGMsIGQsIGtbMTJdLCA2LCAxNzAwNDg1NTcxKTtcbiAgICBkID0gaWkoZCwgYSwgYiwgYywga1szXSwgMTAsIC0xODk0OTg2NjA2KTtcbiAgICBjID0gaWkoYywgZCwgYSwgYiwga1sxMF0sIDE1LCAtMTA1MTUyMyk7XG4gICAgYiA9IGlpKGIsIGMsIGQsIGEsIGtbMV0sIDIxLCAtMjA1NDkyMjc5OSk7XG4gICAgYSA9IGlpKGEsIGIsIGMsIGQsIGtbOF0sIDYsIDE4NzMzMTMzNTkpO1xuICAgIGQgPSBpaShkLCBhLCBiLCBjLCBrWzE1XSwgMTAsIC0zMDYxMTc0NCk7XG4gICAgYyA9IGlpKGMsIGQsIGEsIGIsIGtbNl0sIDE1LCAtMTU2MDE5ODM4MCk7XG4gICAgYiA9IGlpKGIsIGMsIGQsIGEsIGtbMTNdLCAyMSwgMTMwOTE1MTY0OSk7XG4gICAgYSA9IGlpKGEsIGIsIGMsIGQsIGtbNF0sIDYsIC0xNDU1MjMwNzApO1xuICAgIGQgPSBpaShkLCBhLCBiLCBjLCBrWzExXSwgMTAsIC0xMTIwMjEwMzc5KTtcbiAgICBjID0gaWkoYywgZCwgYSwgYiwga1syXSwgMTUsIDcxODc4NzI1OSk7XG4gICAgYiA9IGlpKGIsIGMsIGQsIGEsIGtbOV0sIDIxLCAtMzQzNDg1NTUxKTtcblxuICAgIHhbMF0gPSBhZGQzMihhLCB4WzBdKTtcbiAgICB4WzFdID0gYWRkMzIoYiwgeFsxXSk7XG4gICAgeFsyXSA9IGFkZDMyKGMsIHhbMl0pO1xuICAgIHhbM10gPSBhZGQzMihkLCB4WzNdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNtbihxLCBhLCBiLCB4LCBzLCB0KSB7XG4gICAgYSA9IGFkZDMyKGFkZDMyKGEsIHEpLCBhZGQzMih4LCB0KSk7XG4gICAgcmV0dXJuIGFkZDMyKChhIDw8IHMpIHwgKGEgPj4+ICgzMiAtIHMpKSwgYik7XG4gIH1cblxuICBmdW5jdGlvbiBmZihhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgcmV0dXJuIGNtbigoYiAmIGMpIHwgKCh+YikgJiBkKSwgYSwgYiwgeCwgcywgdCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZyhhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgcmV0dXJuIGNtbigoYiAmIGQpIHwgKGMgJiAofmQpKSwgYSwgYiwgeCwgcywgdCk7XG4gIH1cblxuICBmdW5jdGlvbiBoaChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgcmV0dXJuIGNtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaWkoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgIHJldHVybiBjbW4oYyBeIChiIHwgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWQ1MShzKSB7XG4gICAgLy8gQ29udmVydHMgdGhlIHN0cmluZyB0byBVVEYtOCBcImJ5dGVzXCIgd2hlbiBuZWNlc3NhcnlcbiAgICBpZiAoL1tcXHg4MC1cXHhGRl0vLnRlc3QocykpIHtcbiAgICAgIHMgPSB1bmVzY2FwZShlbmNvZGVVUkkocykpO1xuICAgIH1cbiAgICB2YXIgbiA9IHMubGVuZ3RoLCBzdGF0ZSA9IFsxNzMyNTg0MTkzLCAtMjcxNzMzODc5LCAtMTczMjU4NDE5NCwgMjcxNzMzODc4XSwgaTtcbiAgICBmb3IgKGkgPSA2NDsgaSA8PSBzLmxlbmd0aDsgaSArPSA2NCkge1xuICAgICAgbWQ1Y3ljbGUoc3RhdGUsIG1kNWJsayhzLnN1YnN0cmluZyhpIC0gNjQsIGkpKSk7XG4gICAgfVxuICAgIHMgPSBzLnN1YnN0cmluZyhpIC0gNjQpO1xuICAgIHZhciB0YWlsID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xuICAgIGZvciAoaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSsrKVxuICAgIHRhaWxbaSA+PiAyXSB8PSBzLmNoYXJDb2RlQXQoaSkgPDwgKChpICUgNCkgPDwgMyk7XG4gICAgdGFpbFtpID4+IDJdIHw9IDB4ODAgPDwgKChpICUgNCkgPDwgMyk7XG4gICAgaWYgKGkgPiA1NSkge1xuICAgICAgbWQ1Y3ljbGUoc3RhdGUsIHRhaWwpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IDE2OyBpKyspIHRhaWxbaV0gPSAwO1xuICAgIH1cbiAgICB0YWlsWzE0XSA9IG4gKiA4O1xuICAgIG1kNWN5Y2xlKHN0YXRlLCB0YWlsKTtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBmdW5jdGlvbiBtZDVibGsocykgeyAvKiBJIGZpZ3VyZWQgZ2xvYmFsIHdhcyBmYXN0ZXIuICAgKi9cbiAgICB2YXIgbWQ1YmxrcyA9IFtdLCBpOyAvKiBBbmR5IEtpbmcgc2FpZCBkbyBpdCB0aGlzIHdheS4gKi9cbiAgICBmb3IgKGkgPSAwOyBpIDwgNjQ7IGkgKz0gNCkge1xuICAgICAgbWQ1Ymxrc1tpID4+IDJdID0gcy5jaGFyQ29kZUF0KGkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChzLmNoYXJDb2RlQXQoaSArIDEpIDw8IDgpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChzLmNoYXJDb2RlQXQoaSArIDIpIDw8IDE2KSArXG4gICAgICAgICAgICAgICAgICAgICAgICAocy5jaGFyQ29kZUF0KGkgKyAzKSA8PCAyNCk7XG4gICAgfVxuICAgIHJldHVybiBtZDVibGtzO1xuICB9XG5cbiAgdmFyIGhleF9jaHIgPSAnMDEyMzQ1Njc4OWFiY2RlZicuc3BsaXQoJycpO1xuXG4gIGZ1bmN0aW9uIHJoZXgobikge1xuICAgIHZhciBzID0gJycsIGogPSAwO1xuICAgIGZvciAoOyBqIDwgNDsgaisrKVxuICAgIHMgKz0gaGV4X2NoclsobiA+PiAoaiAqIDggKyA0KSkgJiAweDBGXSArXG4gICAgICAgICBoZXhfY2hyWyhuID4+IChqICogOCkpICYgMHgwRl07XG4gICAgcmV0dXJuIHM7XG4gIH1cblxuICBmdW5jdGlvbiBoZXgoeCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkrKylcbiAgICB4W2ldID0gcmhleCh4W2ldKTtcbiAgICByZXR1cm4geC5qb2luKCcnKTtcbiAgfVxuXG4gIC8qIHRoaXMgZnVuY3Rpb24gaXMgbXVjaCBmYXN0ZXIsIHNvIGlmIHBvc3NpYmxlIHdlIHVzZSBpdC4gU29tZSBJRXMgYXJlIHRoZVxuICBvbmx5IG9uZXMgSSBrbm93IG9mIHRoYXQgbmVlZCB0aGUgaWRpb3RpYyBzZWNvbmQgZnVuY3Rpb24sIGdlbmVyYXRlZCBieSBhblxuICBpZiBjbGF1c2UuICAqL1xuICBmdW5jdGlvbiBhZGQzMihhLCBiKSB7XG4gICAgcmV0dXJuIChhICsgYikgJiAweEZGRkZGRkZGO1xuICB9XG5cbiAgaWYgKGhleChtZDUxKCdoZWxsbycpKSAhPSAnNWQ0MTQwMmFiYzRiMmE3NmI5NzE5ZDkxMTAxN2M1OTInKSB7XG4gICAgZnVuY3Rpb24gYWRkMzIoeCwgeSkge1xuICAgICAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKSxcbiAgICAgICAgICBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgICAgIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xuICAgIH1cbiAgfVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzKSB7XG4gICAgcmV0dXJuIGhleChtZDUxKHMpKTtcbn1cbiJdfQ==