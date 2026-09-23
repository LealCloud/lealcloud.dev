'use client';

import { useCallback, useRef, useState } from 'react';

export interface DraggableSliderProps {
  values: readonly string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function DraggableSlider({
  values,
  value,
  onChange,
  label,
}: DraggableSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const index = Math.max(0, values.indexOf(value));
  const lastIndex = values.length - 1;
  const percent = lastIndex > 0 ? (index / lastIndex) * 100 : 0;

  const indexFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track || lastIndex <= 0) return index;
      const rect = track.getBoundingClientRect();
      const ratio = rect.width === 0 ? 0 : (clientX - rect.left) / rect.width;
      const clamped = Math.min(1, Math.max(0, ratio));
      return Math.round(clamped * lastIndex);
    },
    [index, lastIndex],
  );

  const commitIndex = useCallback(
    (nextIndex: number) => {
      const clamped = Math.min(lastIndex, Math.max(0, nextIndex));
      const nextValue = values[clamped];
      if (nextValue !== value) onChange(nextValue);
    },
    [lastIndex, onChange, value, values],
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    commitIndex(indexFromClientX(event.clientX));
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    // Live snap: recomputed on every move, so crossing the midpoint between
    // two values updates the index immediately instead of waiting for pointerup.
    commitIndex(indexFromClientX(event.clientX));
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
    commitIndex(indexFromClientX(event.clientX));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        commitIndex(index + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        commitIndex(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        commitIndex(0);
        break;
      case 'End':
        event.preventDefault();
        commitIndex(lastIndex);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={lastIndex}
        aria-valuenow={index}
        aria-valuetext={value}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={handleKeyDown}
        className="bg-border relative h-1.5 w-full touch-none rounded-full select-none focus-visible:outline-none"
      >
        <div
          aria-hidden="true"
          className="bg-secondary absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${percent}%` }}
        />
        <div
          aria-hidden="true"
          className={`bg-secondary border-background absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow transition-transform ${
            dragging ? 'scale-125 cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ left: `${percent}%` }}
        />
      </div>

      <div className="text-foreground-subtle mt-2 flex justify-between font-mono text-[11px] uppercase">
        {values.map((v, i) => (
          <button
            key={v}
            type="button"
            onClick={() => commitIndex(i)}
            className={
              v === value
                ? 'text-secondary font-semibold'
                : 'hover:text-foreground'
            }
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
