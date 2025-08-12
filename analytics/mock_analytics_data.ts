
export interface AnalyticsData {
    totalDialogues: number;
    totalParticipants: number;
    avgDuration: number;
    dialoguesByDistrict: { name: string; value: number }[];
    topTopics: { name: string; value: number }[];
    topInterestAreas: { name: string; value: number }[];
    initiativeEngagement: {
        recommended: number;
        selected: number;
    };
}

// Simulate fetching data from an API
export const getAnalyticsData = (): Promise<AnalyticsData> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                totalDialogues: 138,
                totalParticipants: 212,
                avgDuration: 24, // in minutes
                dialoguesByDistrict: [
                    { name: 'Mitte', value: 25 },
                    { name: 'Pankow', value: 18 },
                    { name: 'Neukölln', value: 22 },
                    { name: 'Friedrichshain-Kreuzberg', value: 31 },
                    { name: 'Charlottenburg-Wilmersdorf', value: 15 },
                    { name: 'Spandau', value: 8 },
                    { name: 'Tempelhof-Schöneberg', value: 19 },
                ].sort((a,b) => b.value - a.value),
                topTopics: [
                    { name: 'Wohnen/Bauwende', value: 89 },
                    { name: 'Mobilität', value: 75 },
                    { name: 'Klimaanpassung', value: 62 },
                    { name: 'Wohnen/Wärmewende', value: 45 },
                    { name: 'Sonstiges', value: 21 },
                ].sort((a,b) => b.value - a.value),
                topInterestAreas: [
                    { name: 'Urban Garden', value: 55 },
                    { name: 'Policy Advocacy', value: 48 },
                    { name: 'Repair Café', value: 35 },
                    { name: 'Climate Education', value: 31 },
                    { name: 'Mutual Aid', value: 25 },
                ].sort((a,b) => b.value - a.value),
                initiativeEngagement: {
                    recommended: 180,
                    selected: 95,
                }
            });
        }, 500); // Simulate network delay
    });
};