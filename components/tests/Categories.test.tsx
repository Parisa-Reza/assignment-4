import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Categories from "../product/Categories";

const mockDispatch = vi.fn();

vi.mock("@/store/hooks", () => ({
    useAppDispatch: () => mockDispatch,
    useAppSelector: vi.fn(),
}));

vi.mock("@/store/product-slice", () => ({
    fetchCategories: vi.fn(() => ({
        type: "products/fetchCategories",
    })),
}));

import { useAppSelector } from "@/store/hooks";

// testing if  the compnent renders correctly for both normal data and loading state.


describe("Categories", () => {
    test("renders categories", () => {
        vi.mocked(useAppSelector).mockReturnValue({
            categories: [
                { id: 1, name: "Electronics" },
            ],
            categoriesLoading: false,
            categoriesError: null,
            selectedCategoryId: null, //not a specific category is chosen and the “All” is active.
        });

        render(<Categories />);

        expect(
            screen.getByText("Electronics")
        ).toBeInTheDocument();
    });




    test("shows loading text", () => {
        vi.mocked(useAppSelector).mockReturnValue({
            categories: [],
            categoriesLoading: true,
            categoriesError: null,
            selectedCategoryId: null,
        });

        render(<Categories />);

        expect(
            screen.getByText("Loading categories...")
        ).toBeInTheDocument();
    });
});
