export const generatingApiKey = async (req, res) => {
    try {
        const apiKey = await createAndSaveApiKey();
        res.status(200).json({ apiKey });
    } catch (error) {
        res.status(500).json({ message: 'Error generating API key' });
    }
}
