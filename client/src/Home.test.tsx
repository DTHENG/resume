import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home", () => {
	test("renders", () => {
		render(<Home />);
		const textElement = screen.getByText(/Daniel Thengvall/i);
		expect(textElement).toBeInTheDocument();
	});
});
