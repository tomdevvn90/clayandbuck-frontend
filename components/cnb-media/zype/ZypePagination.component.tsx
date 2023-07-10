import * as React from "react";

interface ZypePaginationProps {
    goToPrevPage: () => void;
    goToNextPage: () => void;
    isLoadingNext: boolean;
    currentPage: number;
    totalPages: number;
}

export function ZypePagination({
    currentPage,
    totalPages,
    goToPrevPage,
    goToNextPage,
    isLoadingNext,
}: ZypePaginationProps) {
    return (
        <div className="component-zype-pagination">
            <button onClick={goToPrevPage} disabled={currentPage <= 1}>&lt;</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={goToNextPage} disabled={currentPage >= totalPages || isLoadingNext}>&gt;</button>
        </div>
    );
}
