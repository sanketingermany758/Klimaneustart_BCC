import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { getAnalyticsData, AnalyticsData } from "./mock_analytics_data";
import StatCard from "./StatCard";
import SimpleBarChart from "./SimpleBarChart";
import SimplePieChart from "./SimplePieChart";
import { Assessment, PeopleAlt, AccessTimeFilled, TrendingUp } from "@mui/icons-material";
import { useLanguage } from "../components/LanguageContext";

const AnalyticsDashboard: React.FC = () => {
  const { t } = useLanguage();
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
        {t("analytics.analyticsDashboard")}
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title={t("analytics.totalDialogues")}
            value={data.totalDialogues}
            icon={<Assessment />}
            color="#2196F3"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title={t("analytics.totalParticipants")}
            value={data.totalParticipants}
            icon={<PeopleAlt />}
            color="#4CAF50"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title={t("analytics.avgDuration")}
            value={data.avgDuration}
            icon={<AccessTimeFilled />}
            color="#FF9800"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title={t("analytics.initiativeEngagement")}
            value={`${engagementRate}%`}
            icon={<TrendingUp />}
            color="#9C27B0"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <SimplePieChart title={t("analytics.topDiscussedTopics")} data={data.topTopics} />
        </Grid>
        <Grid xs={12} md={6}>
          <SimplePieChart
            title={t("analytics.dialoguesPerDistrict")}
            data={data.dialoguesByDistrict}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <SimplePieChart
            title={t("analytics.topInterestAreas")}
            data={data.topInterestAreas}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
              {t("analytics.initiativeEngagementDetails")}
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
                <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
                  {data.initiativeEngagement.recommended}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {t("analytics.recommended")}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
                  {data.initiativeEngagement.selected}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {t("analytics.selected")}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#4CAF50' }}>
                  {engagementRate}%
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {t("analytics.engagementRate")}
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
