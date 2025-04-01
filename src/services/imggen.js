const apiKey = process.env.REACT_APP_IMAGEPIG_API_KEY;

export const generateImage = async (prompt) => {
    try {
        // Check if API key is defined
        console.log("🔍 API Key:", process.env.REACT_APP_IMAGEPIG_API_KEY);

        if (!apiKey) {
            console.error("❌ API key is missing. Check your .env file.");
            throw new Error("API key is missing. Make sure REACT_APP_IMAGEPIG_API_KEY is set in .env.");
        }

        console.log("🔑 Using API Key:", apiKey); // Debugging

        const response = await fetch('https://api.imagepig.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': apiKey,
            },
            body: JSON.stringify({ prompt })
        });

        // Read response text for debugging
        const responseText = await response.text();

        if (!response.ok) {
            console.error("🚨 API Error Response:", responseText);
            throw new Error(`Response failed with status ${response.status}: ${responseText}`);
        }

        const json = JSON.parse(responseText);
        if (!json.image_data) {
            console.error("⚠️ Invalid API response:", json);
            throw new Error("API response does not contain image data.");
        }

        return `data:image/jpeg;base64,${json.image_data}`;
    } catch (error) {
        console.error("❌ Image generation error:", error);
        return null;
    }
};
