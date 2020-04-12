/**
 * @author Valentin Saugnier (valentin.s.10@gmail.com)
 */
import { Observable, Observer } from 'rxjs';
import * as child from 'child_process';

const fkill = require('fkill');

export class AudioDecoder {

    private _checkDepends(): void {
        const arecordError = new Error('ARecord not found');
        const multimonError = new Error('Multimon-ng not found');

        try {
            child.execSync('arecord --version', {
                stdio: 'ignore'
            });
        } catch (e) {
            throw arecordError;
        }

        try {
            child.execSync('multimon-ng -h', {
                stdio: 'ignore'
            });
        } catch (e) {
            if (e.status !== 2) {
                throw multimonError;
            }
        }
    }

    public decode(device: string, type: MultimonModeEnum[] | string[], arecordOptions: string[] = [], multimonOptions: string[] = []): Observable<AudioDecoderDecodedResult> {
        this._checkDepends();

        const execString = `arecord -D ${device} -r 22050 -f S16_LE ${arecordOptions.join(' ')} | multimon-ng -v 0 -q ${multimonOptions.join(' ')} -a ${type.join(' -a ')} -t raw /dev/stdin`;
        const process = child.exec(execString);

        return new Observable<AudioDecoderDecodedResult>((observer: Observer<AudioDecoderDecodedResult>) => {
            process.stdout?.on('data', (message: string) => {
                message = message.trim();
                const split = message.split(':');

                observer.next({
                    raw: message,
                    type: split[0],
                    data: split[1].substring(1)
                } as AudioDecoderDecodedResult);
            });
            process.on('exit', _ => observer.complete());
            process.on('error', err => observer.error(err));
        });
    }

    public stop(): Observable<boolean> {
        return new Observable<boolean>((observer: Observer<boolean>) => {
            try {
                fkill(['arecord', 'multimon-ng']).then((_: void) => observer.next(true));
            } catch (e) {
                observer.next(false);
            }
            observer.complete();
        });
    }
}

export interface AudioDecoderDecodedResult {
    type: string;
    data: string;
    raw: string;
}

export enum MultimonModeEnum {
    AFSK1200 = 'AFSK1200',
    AFSK2400 = 'AFSK2400',
    AFSK2400_2 = 'AFSK2400_2',
    AFSK2400_3 = 'AFSK2400_3',
    CCIR = 'CCIR',
    CLIPFSK = 'CLIPFSK',
    DUMP_CSV = 'DUMPCSV',
    DTMF = 'DTMF',
    DZVEI = 'DZVEI',
    EAS = 'EAS',
    EEA = 'EEA',
    EIA = 'EIA',
    FLEX = 'FLEX',
    FSK9600 = 'FSK9600',
    HAPN4800 = 'HAPN4800',
    MORSE_CW = 'MORSE_CW',
    POCSAG1200 = 'POCSAG1200',
    POCSAG2400 = 'POCSAG2400',
    POCSAG512 = 'POCSAG512',
    PZVEI = 'PZVEI',
    TONE = 'TONE', // only for https://github.com/valentintintin/multimon-ng
    UFSK1200 = 'UFSK1200',
    X10 = 'X10',
    ZVEI1 = 'ZVEI1',
    ZVEI2 = 'ZVEI2',
    ZVEI3 = 'ZVEI3',
}
