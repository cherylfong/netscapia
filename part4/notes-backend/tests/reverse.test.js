
// test file names end with .test.js, 
// sas the node:test testing library automatically executes test files named this way
const { test, describe } = require('node:test')
const assert = require('node:assert')

// import reverse function from utils directory
const reverse = require('../utils/for_testing').reverse

describe('TESTING: reverse function', () => {
    test('reverse of a', () => {
        const result = reverse('a')

        assert.strictEqual(result, 'a')
    })

    test('reverse of react', () => {
        const result = reverse('react')

        assert.strictEqual(result, 'tcaer')
    })

    test('reverse of saippuakauppias', () => {
        const result = reverse('saippuakauppias')

        assert.strictEqual(result, 'saippuakauppias')
    })
})
