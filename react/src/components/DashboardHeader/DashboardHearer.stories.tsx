import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import DashboardHeader from "./DashboardHeader";
import Wrapper from "../Wrapper/Wrapper";

const meta: Meta<typeof DashboardHeader> = {
  component: DashboardHeader,
  title: "Onvo/DashboardHeader",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DashboardHeader>;

export const Primary: Story = (args) => {
  return (
    <Wrapper {...args}>
      <DashboardHeader />
    </Wrapper>
  );
};

Primary.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmQiOiIwNDFkM2Q4ZS1kYTA1LTRlZjktODVlMS04NjNjZDY0ODQ5Y2EiLCJzZXNzaW9uIjoiNjY0NDkyODUtMDU3OC00ZGU2LWE3MDEtMzYxOGUyMGQ5YWQzIn0sInN1YiI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZC01ODk5Zjk5ZC1hNDQ5LTRiZmEtODc2OS0xOWMwOTdhYWYxZjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNjk2MTg1MjE2fQ.NpmZ7zUPG-RFyzbTp-SIJ4E0XYSaN-lSUW1tFjCPt1g",
  baseUrl: "http://localhost:3004",
};
