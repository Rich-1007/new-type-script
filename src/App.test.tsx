import React from "react";
import { screen, render, fireEvent, waitFor, queryByText } from "@testing-library/react";
import App from "./App";
import axios from "axios";
import '@testing-library/jest-dom'



// Mock jest and set the type
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("App", () => {
  const renderComponent = () => render(<App />);

  test("renders learn react link", async () => {
    const { getByText, getAllByRole } = renderComponent();

    // Provide the data object to be returned
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: "Joe Doe",
        },
        {
          id: 2,
          name: "Jane Doe",
        },
      ],
    });

    fireEvent.click(getByText("Get users"));

    await waitFor(() => {
      const userList = getAllByRole("listitem");
      expect(userList).toHaveLength(2);


      
      expect(screen.getByText("Joe Doe")).toBeInTheDocument();
      expect(userList[1]).toHaveTextContent('Jane Doe');
    });
  });
});
