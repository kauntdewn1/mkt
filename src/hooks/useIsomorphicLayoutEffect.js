import { useEffect, useLayoutEffect } from 'react';

/**
 *
 * @type {{(effect: React.EffectCallback, deps?: React.DependencyList): void, (effect: React.EffectCallback, deps?: React.DependencyList): void}}
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
