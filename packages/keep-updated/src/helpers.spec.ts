import { detectPackageManager } from './helpers';

describe('helpers / detectPackageManager', () => {
    it('should return npm', () => {
        expect(detectPackageManager()).toEqual('npm');
    });
});
