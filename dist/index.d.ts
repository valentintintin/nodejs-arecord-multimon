/// <reference types="node" />
/**
 * @author Valentin Saugnier (valentin.s.10@gmail.com)
 */
import { Observable } from 'rxjs';
import { ChildProcess } from 'child_process';
export declare class AudioDecoder {
    private _checkDepends;
    decode(device: string, type: MultimonModeEnum[], arecordOptions?: string[], multimonOptions?: string[]): AudioDecoderDecodeResult;
    stop(): Observable<boolean>;
}
export interface AudioDecoderDecodeResult {
    process: ChildProcess;
    data: Observable<string>;
}
export declare enum MultimonModeEnum {
    AFSK1200 = "AFSK1200",
    APRS = "AFSK1200",
    AFSK2400 = "AFSK2400",
    AFSK2400_2 = "AFSK2400_2",
    AFSK2400_3 = "AFSK2400_3",
    CCIR = "CCIR",
    CLIPFSK = "CLIPFSK",
    CW = "CW",
    DTMF = "DTMF",
    DZVEI = "DZVEI",
    EAS = "EAS",
    EEA = "EEA",
    EIA = "EIA",
    FLEX = "FLEX",
    FSK9600 = "FSK9600",
    HAPN4800 = "HAPN4800",
    MORSE = "MORSE",
    POCSAG1200 = "POCSAG1200",
    POCSAG2400 = "POCSAG2400",
    POCSAG512 = "POCSAG512",
    PZVEI = "PZVEI",
    UFSK1200 = "UFSK1200",
    X10 = "X10",
    ZVEI1 = "ZVEI1",
    ZVEI2 = "ZVEI2",
    ZVEI3 = "ZVEI3"
}
