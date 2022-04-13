import { Router } from 'https://deno.land/x/oak/mod.ts';

import { getAdvertisements, removeAdvertisements, updateAdvertisements } from './advertisements.ts';

const router: Router = new Router();

router.get('/api/v1/advertisements', getAdvertisements);
router.post('/api/v1/advertisements', updateAdvertisements);
router.delete('/api/v1/advertisements', removeAdvertisements);

export default router;