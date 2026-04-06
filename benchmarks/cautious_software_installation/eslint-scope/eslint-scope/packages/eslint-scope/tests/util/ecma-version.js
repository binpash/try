/**
 * @fileoverview ECMAScript version utilities used in tests
 * @author Milos Djermanovic
 */

import * as espree from "espree";

/**
 * Gets an array of supported ECMAScript versions.
 * @param {number} [min] Minimum ECMAScript version to get. This should be a revision-based number (3, 5, 6, 7...).
 * @returns {number[]} Supported ECMAScript versions, including their year-based representations.
 * @example
 *
 * getSupportedEcmaVersions()
 * // => [3, 5, 6, 2015, 7, 2016, 8, 2017, 9, 2018, 10, 2019, 11, 2020, 12, 2021, 13, 2022]
 *
 * getSupportedEcmaVersions({ min: 8 })
 * // => [8, 2017, 9, 2018, 10, 2019, 11, 2020, 12, 2021, 13, 2022]
 *
 */
export function getSupportedEcmaVersions({ min = 0 } = {}) {
    return espree.supportedEcmaVersions
        .filter(
            ecmaVersion => ecmaVersion >= min
        )
        .flatMap(
            ecmaVersion => (ecmaVersion >= 6 ? [ecmaVersion, ecmaVersion + 2009] : [ecmaVersion])
        );
}
