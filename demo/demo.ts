import { AudioDecoder, MultimonModeEnum } from '../index';

console.log('Start demo');

const audioDecoder = new AudioDecoder();
const result = audioDecoder.decode('pulse', [MultimonModeEnum.DTMF, MultimonModeEnum.APRS], [], ['-A']);

console.log('Pid started : ' + result.process.pid);

result.data.subscribe(data => console.log(data));

setTimeout(_ => {
    console.log('Stop demo');
    audioDecoder.stop().subscribe();
}, 25000);
