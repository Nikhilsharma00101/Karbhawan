export interface RateLimitOptions {
    interval: number; // milliseconds
    uniqueTokenPerInterval: number; // Max number of tokens to keep in cache
}

export const rateLimit = (options: RateLimitOptions) => {
    const tokenCache = new Map();

    return {
        check: (res: { headers: { set: (name: string, value: string) => void } }, limit: number, token: string) => {
            const now = Date.now();
            const tokenCount = tokenCache.get(token) || [0];

            // Cleanup old cache entries periodically
            if (tokenCache.size > options.uniqueTokenPerInterval) {
                tokenCache.clear();
            }

            if (tokenCount[0] === 0 || (now - tokenCount[1]) > options.interval) {
                tokenCount[0] = 1;
                tokenCount[1] = now;
            } else {
                tokenCount[0] += 1;
            }

            tokenCache.set(token, tokenCount);
            const currentUsage = tokenCount[0];
            const isRateLimited = currentUsage > limit;

            res.headers.set('X-RateLimit-Limit', limit.toString());
            res.headers.set('X-RateLimit-Remaining', isRateLimited ? '0' : (limit - currentUsage).toString());

            return isRateLimited;
        },
    };
};
