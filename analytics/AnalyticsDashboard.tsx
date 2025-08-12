import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { getAnalyticsData, AnalyticsData } from "./mock_analytics_data";
import StatCard from "./StatCard";
import SimpleBarChart from "./SimpleBarChart";
import { DialerSipOutlined } from "@mui/icons-material";
// import { Assessment, PeopleAlt, AccessTimeFilled } from '@mui/icons-material';

const AnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const engagementRate =
    data.initiativeEngagement.recommended > 0
      ? (
          (data.initiativeEngagement.selected /
            data.initiativeEngagement.recommended) *
          100
        ).toFixed(1)
      : 0;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Analytics Dashboard
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid xs={12} sm={6} md={4}>
          <StatCard
            title="Total Dialogues"
            value={data.totalDialogues}
            icon={<DialerSipOutlined />}
            // icon={<Assessment />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <StatCard
            title="Total Participants"
            value={data.totalParticipants}
            icon={<DialerSipOutlined />}
            // icon={<PeopleAlt />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <StatCard
            title="Avg. Duration (min)"
            value={data.avgDuration}
            icon={<DialerSipOutlined />}
            // icon={<AccessTimeFilled />}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <SimpleBarChart title="Top Discussed Topics" data={data.topTopics} />
          {/* <LineChart
                        {...chartsParams}
                        series={[
                            {
                                data: [15, 23, 18, 19, 13],
                                label: 'Example',
                                color,
                            },
                        ]}
                    /> */}
        </Grid>
        <Grid xs={12} md={6}>
          <SimpleBarChart
            title="Dialogues per District"
            data={data.dialoguesByDistrict}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <SimpleBarChart
            title="Top Interest Areas"
            data={data.topInterestAreas}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Initiative Engagement
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexWrap: "wrap",
                gap: 2,
                mt: 2,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold">
                  {data.initiativeEngagement.recommended}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Recommended
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold">
                  {data.initiativeEngagement.selected}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Selected
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" color="success.main">
                  {engagementRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Engagement Rate
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;
