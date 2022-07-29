/**
 * toJson - for bigint error
 * @param data response with bitints
 * @returns response with transformed bitints
 */
export function toJson(data: any) {
    if (data !== undefined) {
        let intCount = 0;
        let repCount = 0;
        const json = JSON.stringify(data, (_, v) => {
            if (typeof v === 'bigint') {
                intCount++;
                return `${v}#bigint`;
            }
            return v;
        });
        const res = json.replace(/"(-?\d+)#bigint"/g, (_, a) => {
            repCount++;
            return a;
        });
        if (repCount > intCount) {
            // You have a string somewhere that looks like "123#bigint";
            throw new Error(`BigInt serialization conflict with a string value.`);
        }
        return res;
    }
}

export const idempotencyGenerator = async () => {
    const {
        scrypt
    } = await import('node:crypto');

    // Using the factory defaults.
    scrypt('password', 'salt', 64, (err, derivedKey) => {
        if (err) throw err;
        console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
        return derivedKey.toString('hex');
    });
};