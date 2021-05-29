import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

describe("NotFound", () => {
	test("renders", () => {
		render(<NotFound />);
		const textElement = screen.getByText(/Not Found/i);
		expect(textElement).toBeInTheDocument();
	});
});
