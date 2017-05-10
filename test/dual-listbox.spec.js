import DualListbox, { DualListbox as DualListbox2 } from '../src/dual-listbox.js';


describe('module', function() {
    it('should export a default', () => {
        expect(DualListbox).toBeTruthy();
    });

    it('should export a name', () => {
        expect(DualListbox2).toBeTruthy();
    });
});
