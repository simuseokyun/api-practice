import { useRef, useState, useEffect, useCallback, RefObject } from 'react'

const useInfiniteScroll = (targetEl: RefObject<HTMLElement | null>) => {
    const observerRef = useRef<IntersectionObserver>(null)
    const [intersecting, setIntersecting] = useState(false)

    const getObserver = useCallback(() => {
        if (!observerRef.current) {
            observerRef.current = new IntersectionObserver((entries) =>
                setIntersecting(entries.some((entry) => entry.isIntersecting))
            )
        }
        return observerRef.current
    }, [observerRef.current])

    useEffect(() => {
        if (targetEl.current) getObserver().observe(targetEl.current)

        return () => {
            getObserver().disconnect()
        }
    }, [targetEl.current])

    return intersecting
}

export default useInfiniteScroll
