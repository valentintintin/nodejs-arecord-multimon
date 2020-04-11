"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
console.log('Start demo');
var audioDecoder = new index_1.AudioDecoder();
var result = audioDecoder.decode('pulse', [index_1.MultimonModeEnum.DTMF, index_1.MultimonModeEnum.APRS], [], ['-A']);
console.log('Pid started : ' + result.process.pid);
result.data.subscribe(function (data) { return console.log(data); });
setTimeout(function (_) {
    console.log('Stop demo');
    audioDecoder.stop().subscribe();
}, 25000);
