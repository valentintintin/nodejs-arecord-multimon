# nodejs-arecord-multimon

This project is a wrapper for a command linux such as : 

`arecord -D pulse -r 22050 -f S16_LE | multimon-ng -v 0 -q -A -a DTMF -a AFSK1200 -t raw /dev/stdin`

## Inspiration

Idea for the project : [linux-dtmf](https://github.com/lailune/linux-dtmf)

## Dependencies
* Arecord `sudo apt-get install alsa-base alsa-utils`
* [multimon-ng](https://github.com/EliasOenal/multimon-ng)

## Code example

```typescript
import { AudioDecoder, MultimonModeEnum } from 'nodejs-arecord-multimon';

new AudioDecoder().decode('hw:0,0', [
    MultimonModeEnum.DTMF, 
    MultimonModeEnum.APRS
], [], ['-A']).data.subscribe(data => console.log(data));
```
