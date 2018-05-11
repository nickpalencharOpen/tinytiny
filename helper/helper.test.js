const { randomHash } = require('./index.js');

describe('randomHash', () => {

    test('Produces a string', () => {
        expect(typeof randomHash(2)).toBe('string');
        expect(typeof randomHash(4)).toBe('string');
        expect(typeof randomHash(40)).toBe('string');
    });

    test('Produces a has equal to a given length', () => {
        expect(randomHash(2).length).toBe(2);
        expect(randomHash(5).length).toBe(5);
    });

    test('produces a random hash', () => {

        function redemptivleyRun(fn, ...args) {
            // returns an array contaning two outputs
            // from `randomHash` (ran twice). Because random
            // outputs CAN be the same (though rarely), will
            // retry 500 times before allowing identical outputs to
            // return.

            for (let i = 0; i < 500; i++) {
                let r1 = fn(...args);
                let r2 = fn(...args);

                if (r1 !== r2) {
                    return [r1, r2];
                }
            }
        }

        let results = redemptivleyRun(randomHash, 1);
        expect(results[0]).not.toBe(results[1]);

        results = redemptivleyRun(randomHash, 2);
        expect(results[0]).not.toBe(results[1]);

        results = redemptivleyRun(randomHash, 10);
        expect(results[0]).not.toBe(results[1]);
    })
});



