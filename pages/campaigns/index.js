import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import CampaignsPage from "../../src/components/Campaigns";

const Index = ({ configData, campaignsDetails }) => {
  return (
    <>
      <CssBaseline />
      <MetaData title={`campaigns - ${configData?.business_name}`} />
      <MainLayout configData={configData}>
        <CampaignsPage />
      </MainLayout>
    </>
  );
};

export default Index;
export const getServerSideProps = async () => {
  const configRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
    {
      method: "GET",
      headers: {
        "X-software-id": 33571750,
        "X-server": "server",
        origin: process.env.NEXT_CLIENT_HOST_URL,
      },
    }
  );

  const config = await configRes.json();

  return {
    props: {
      configData: config,
    },
  };
};
