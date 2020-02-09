import { iQOS } from '../src/index';
const iqos = new iQOS(navigator.bluetooth);
//@ts-ignore
window.iqos = iqos;
