/**
 * Created with JetBrains WebStorm.
 * User: allanma
 * Date: 12-5-10
 * Time: 下午5:14
 * equal.js
 */

(function ($, undefined) {
    var isEqual = function (a, b, stack) {
        stack || (stack = []);

        // exit early for identical values
        if (a === b) {
            // treat `+0` vs. `-0` as not equal
            return a !== 0 || (1 / a == 1 / b);
        }
        // a strict comparison is necessary because `null == undefined`
        if (a == undefined || b == undefined) {
            return a === b;
        }
        // unwrap any wrapped objects
        if (a._chain) {
            a = a._wrapped;
        }
        if (b._chain) {
            b = b._wrapped;
        }
        // invoke a custom `isEqual` method if one is provided
        if (a.isEqual && toString.call(a.isEqual) == funcClass) {
            return a.isEqual(b);
        }
        if (b.isEqual && toString.call(b.isEqual) == funcClass) {
            return b.isEqual(a);
        }
        // compare [[Class]] names
        var className = toString.call(a);
        if (className != toString.call(b)) {
            return false;
        }
        switch (className) {
            // strings, numbers, dates, and booleans are compared by value
            case stringClass:
                // primitives and their corresponding object instances are equivalent;
                // thus, `'5'` is quivalent to `new String('5')`
                return a == String(b);

            case numberClass:
                // treat `NaN` vs. `NaN` as equal
                return a != +a
                    ? b != +b
                    // but treat `+0` vs. `-0` as not equal
                    : (a == 0 ? (1 / a == 1 / b) : a == +b);

            case boolClass:
            case dateClass:
                // coerce dates and booleans to numeric values, dates to milliseconds and booleans to 1 or 0;
                // treat invalid dates coerced to `NaN` as not equal
                return +a == +b;

            // regexps are compared by their source and flags
            case regexpClass:
                return a.source == b.source &&
                    a.global == b.global &&
                    a.multiline == b.multiline &&
                    a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != 'object' || typeof b != 'object') {
            return false;
        }
        // Assume equality for cyclic structures. The algorithm for detecting cyclic
        // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
        var length = stack.length;
        while (length--) {
            // Linear search. Performance is inversely proportional to the number of
            // unique nested structures.
            if (stack[length] == a) {
                return true;
            }
        }

        var index = -1,
            result = true,
            size = 0;

        // add the first collection to the stack of traversed objects
        stack.push(a);

        // recursively compare objects and arrays
        if (className == arrayClass) {
            // compare array lengths to determine if a deep comparison is necessary
            size = a.length;
            result = size == b.length;

            if (result) {
                // deep compare the contents, ignoring non-numeric properties
                while (size--) {
                    if (!(result = isEqual(a[size], b[size], stack))) {
                        break;
                    }
                }
            }
        } else {
            // objects with different constructors are not equivalent
            if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
                return false;
            }
            // deep compare objects.
            for (var prop in a) {
                if (hasOwnProperty.call(a, prop)) {
                    // count the number of properties.
                    size++;
                    // deep compare each property value.
                    if (!(result = hasOwnProperty.call(b, prop) && isEqual(a[prop], b[prop], stack))) {
                        break;
                    }
                }
            }
            // ensure both objects have the same number of properties
            if (result) {
                for (prop in b) {
                    if (hasOwnProperty.call(b, prop) && !(size--)) break;
                }
                result = !size;
            }
            // handle JScript [[DontEnum]] bug
            if (result && hasDontEnumBug) {
                while (++index < 7) {
                    prop = shadowed[index];
                    if (hasOwnProperty.call(a, prop)) {
                        if (!(result = hasOwnProperty.call(b, prop) && isEqual(a[prop], b[prop], stack))) {
                            break;
                        }
                    }
                }
            }
        }
        // remove the first collection from the stack of traversed objects
        stack.pop();
        return result;
    };

    $.nameSpace.pack('Mallan.util.isEqual', isEqual);
})(Mallan);
