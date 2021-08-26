import { useState, useRef, useCallback } from 'react';
import { useIsomorphicEffect } from './useIsomorphicEffect';
export const useElapsedTime = ({ isPlaying, duration, startAt = 0, updateInterval = 0, onComplete, onUpdate, }) => {
    const [elapsedTime, setElapsedTime] = useState(startAt);
    const totalElapsedTimeRef = useRef(startAt * -1000); // keep in milliseconds to avoid summing up floating point numbers
    const requestRef = useRef(null);
    const previousTimeRef = useRef(null);
    const repeatTimeoutRef = useRef(null);
    const loopRef = useRef({
        elapsedTimeRef: 0,
        startAtRef: startAt,
        durationRef: duration,
        updateIntervalRef: updateInterval,
    });
    // keep duration and updateInterval up to date in the loop in case they change while the loop is running
    loopRef.current = Object.assign(Object.assign({}, loopRef.current), { durationRef: duration, updateIntervalRef: updateInterval });
    const loop = (time) => {
        const timeSec = time / 1000;
        if (previousTimeRef.current === null) {
            previousTimeRef.current = timeSec;
            requestRef.current = requestAnimationFrame(loop);
            return;
        }
        // get current elapsed time
        const { durationRef, elapsedTimeRef, updateIntervalRef, startAtRef } = loopRef.current;
        const deltaTime = timeSec - previousTimeRef.current;
        const currentElapsedTime = elapsedTimeRef + deltaTime;
        // update refs with the current elapsed time
        previousTimeRef.current = timeSec;
        loopRef.current = Object.assign(Object.assign({}, loopRef.current), { elapsedTimeRef: currentElapsedTime });
        // set current display time
        const currentDisplayTime = startAtRef +
            (updateIntervalRef === 0
                ? currentElapsedTime
                : ((currentElapsedTime / updateIntervalRef) | 0) * updateIntervalRef);
        const totalTime = startAtRef + currentElapsedTime;
        const isCompleted = typeof durationRef === 'number' && totalTime >= durationRef;
        setElapsedTime(isCompleted ? durationRef : currentDisplayTime);
        // repeat animation if not completed
        if (!isCompleted) {
            requestRef.current = requestAnimationFrame(loop);
        }
    };
    const cleanup = () => {
        requestRef.current && cancelAnimationFrame(requestRef.current);
        repeatTimeoutRef.current && clearTimeout(repeatTimeoutRef.current);
        previousTimeRef.current = null;
    };
    const reset = useCallback((newStartAt = startAt) => {
        cleanup();
        loopRef.current = Object.assign(Object.assign({}, loopRef.current), { elapsedTimeRef: 0, startAtRef: newStartAt });
        setElapsedTime(newStartAt);
        if (isPlaying) {
            requestRef.current = requestAnimationFrame(loop);
        }
    }, [isPlaying, startAt]);
    useIsomorphicEffect(() => {
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(elapsedTime);
        if (duration && elapsedTime >= duration) {
            totalElapsedTimeRef.current += duration * 1000;
            const { shouldRepeat = false, delay = 0, newStartAt, } = (onComplete === null || onComplete === void 0 ? void 0 : onComplete(totalElapsedTimeRef.current / 1000)) || {};
            if (shouldRepeat) {
                repeatTimeoutRef.current = setTimeout(() => reset(newStartAt), delay * 1000);
            }
        }
    }, [elapsedTime, duration]);
    useIsomorphicEffect(() => {
        if (isPlaying) {
            requestRef.current = requestAnimationFrame(loop);
        }
        return cleanup;
    }, [isPlaying]);
    return { elapsedTime, reset };
};