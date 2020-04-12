import { AudioDecoder, MultimonModeEnum } from '../src/audio-decoder';

console.log('Start demo');

const audioDecoder = new AudioDecoder();
audioDecoder.decode('pulse', [MultimonModeEnum.DTMF, MultimonModeEnum.AFSK1200], [], ['-A']).subscribe(data => console.log(data));

setTimeout(_ => {
    console.log('Stop demo');
    audioDecoder.stop().subscribe();
}, 25000);
