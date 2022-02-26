import { detectPackageManager } from './package-manager';

describe('helpers / detectPackageManager', () => {
    it('should return npm', () => {
        expect(detectPackageManager()).toEqual('npm');
    });
});
