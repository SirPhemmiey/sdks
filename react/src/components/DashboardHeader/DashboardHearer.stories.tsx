import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DashboardHeader } from "./DashboardHeader";
import { Wrapper } from "../Wrapper/Wrapper";
import { Dashboard } from "../Dashboard/Dashboard";
import { Button } from "../../tremor/Button";

const meta: Meta<typeof DashboardHeader> = {
  component: DashboardHeader,
  title: "Onvo/DashboardHeader",
  argTypes: {},
};
export default meta;

type Story = StoryObj<{ token: string; baseUrl: string; id: string }>;

export const Primary: Story = (args) => {
  return (
    <Wrapper {...args}>
      <Dashboard id={args.id}>
        <DashboardHeader>
          <Button size="xs">Share</Button>
        </DashboardHeader>
      </Dashboard>
    </Wrapper>
  );
};

Primary.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
  baseUrl: "https://staging.onvo.ai",
  id: "f90182a2-f485-45a8-a9d6-b72021c03b50",
};
Primary.parameters = { layout: "fullscreen" };
