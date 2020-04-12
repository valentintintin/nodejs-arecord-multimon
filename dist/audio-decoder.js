"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Valentin Saugnier (valentin.s.10@gmail.com)
 */
var rxjs_1 = require("rxjs");
var child = require("child_process");
var fkill = require('fkill');
var AudioDecoder = /** @class */ (function () {
    function AudioDecoder() {
    }
    AudioDecoder.prototype._checkDepends = function () {
        var arecordError = new Error('ARecord not found');
        var multimonError = new Error('Multimon-ng not found');
        try {
            child.execSync('arecord --version', {
                stdio: 'ignore'
            });
        }
        catch (e) {
            throw arecordError;
        }
        try {
            child.execSync('multimon-ng -h', {
                stdio: 'ignore'
            });
        }
        catch (e) {
            if (e.status !== 2) {
                throw multimonError;
            }
        }
    };
    AudioDecoder.prototype.decode = function (device, type, arecordOptions, multimonOptions) {
        if (arecordOptions === void 0) { arecordOptions = []; }
        if (multimonOptions === void 0) { multimonOptions = []; }
        this._checkDepends();
        var execString = "arecord -D " + device + " -r 22050 -f S16_LE " + arecordOptions.join(' ') + " | multimon-ng -v 0 -q " + multimonOptions.join(' ') + " -a " + type.join(' -a ') + " -t raw /dev/stdin";
        var process = child.exec(execString);
        return new rxjs_1.Observable(function (observer) {
            var _a;
            (_a = process.stdout) === null || _a === void 0 ? void 0 : _a.on('data', function (message) {
                message = message.trim();
                var split = message.split(':');
                observer.next({
                    raw: message,
                    type: split[0],
                    data: split[1].substring(1)
                });
            });
            process.on('exit', function (_) { return observer.complete(); });
            process.on('error', function (err) { return observer.error(err); });
        });
    };
    AudioDecoder.prototype.stop = function () {
        return new rxjs_1.Observable(function (observer) {
            try {
                fkill(['arecord', 'multimon-ng']).then(function (_) { return observer.next(true); });
            }
            catch (e) {
                observer.next(false);
            }
            observer.complete();
        });
    };
    return AudioDecoder;
}());
exports.AudioDecoder = AudioDecoder;
var MultimonModeEnum;
(function (MultimonModeEnum) {
    MultimonModeEnum["AFSK1200"] = "AFSK1200";
    MultimonModeEnum["AFSK2400"] = "AFSK2400";
    MultimonModeEnum["AFSK2400_2"] = "AFSK2400_2";
    MultimonModeEnum["AFSK2400_3"] = "AFSK2400_3";
    MultimonModeEnum["CCIR"] = "CCIR";
    MultimonModeEnum["CLIPFSK"] = "CLIPFSK";
    MultimonModeEnum["DUMP_CSV"] = "DUMPCSV";
    MultimonModeEnum["DTMF"] = "DTMF";
    MultimonModeEnum["DZVEI"] = "DZVEI";
    MultimonModeEnum["EAS"] = "EAS";
    MultimonModeEnum["EEA"] = "EEA";
    MultimonModeEnum["EIA"] = "EIA";
    MultimonModeEnum["FLEX"] = "FLEX";
    MultimonModeEnum["FSK9600"] = "FSK9600";
    MultimonModeEnum["HAPN4800"] = "HAPN4800";
    MultimonModeEnum["MORSE_CW"] = "MORSE_CW";
    MultimonModeEnum["POCSAG1200"] = "POCSAG1200";
    MultimonModeEnum["POCSAG2400"] = "POCSAG2400";
    MultimonModeEnum["POCSAG512"] = "POCSAG512";
    MultimonModeEnum["PZVEI"] = "PZVEI";
    MultimonModeEnum["TONE"] = "TONE";
    MultimonModeEnum["UFSK1200"] = "UFSK1200";
    MultimonModeEnum["X10"] = "X10";
    MultimonModeEnum["ZVEI1"] = "ZVEI1";
    MultimonModeEnum["ZVEI2"] = "ZVEI2";
    MultimonModeEnum["ZVEI3"] = "ZVEI3";
})(MultimonModeEnum = exports.MultimonModeEnum || (exports.MultimonModeEnum = {}));
