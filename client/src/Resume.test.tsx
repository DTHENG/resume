import React from "react";
import { render, screen } from "@testing-library/react";
import Resume from "./Resume";

describe("Resume", () => {
	test("renders", () => {
		render(<Resume />);
		const textElement = screen.getByText(/Resume/i);
		expect(textElement).toBeInTheDocument();
	});
});
