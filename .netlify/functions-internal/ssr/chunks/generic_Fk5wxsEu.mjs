export { renderers } from '../renderers.mjs';

const page = () => import('./pages/generic_DDeIRas2.mjs').then(n => n.g);

export { page };
