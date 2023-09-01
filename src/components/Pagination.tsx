import React from "react";

type Props = {
  pages: number;
  current: number;
  onPrev: () => void;
  onNext: () => void;
};

const Pagination = ({ current, onNext, onPrev, pages }: Props) => {
  return (
    <div className="flex justify-center items-center gap-3">
      <button
        className="px-6 py-2 bg-indigo-100 disabled:opacity-30"
        onClick={onPrev}
        disabled={current <= 1}
      >
        &lt;&lt; Prev
      </button>
      <span className="text-slate-600">
        Page: {current} of {pages}
      </span>
      <button
        className="px-6 py-2 bg-indigo-100 disabled:opacity-30"
        onClick={onNext}
        disabled={current >= pages}
      >
        Next &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
