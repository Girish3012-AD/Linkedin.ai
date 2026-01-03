const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai'); // Ready for use if key is provided

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Linkin API is running');
});

// Generate Post Content
app.post('/api/generate', async (req, res) => {
    const { topic, persona } = req.body;

    console.log('Generating post for:', topic, persona);

    // TODO: Integrate OpenAI here
    // const completion = await openai.chat.completions.create({...})

    // Mock response
    const mockResponse = `🚀 Thinking about ${topic}...\n\nAs a ${persona.role}, I believe this is a game changer.\n\n#${persona.topics?.split(',')[0]} #Growth`;

    setTimeout(() => {
        res.json({ content: mockResponse });
    }, 1000);
});

// Post to LinkedIn
app.post('/api/post', async (req, res) => {
    const { content } = req.body;

    console.log('Posting to LinkedIn:', content);

    // TODO: Integrate LinkedIn API
    // await axios.post('https://api.linkedin.com/v2/ugcPosts', { ... })

    setTimeout(() => {
        res.json({ success: true, url: 'https://linkedin.com/feed/update/urn:li:activity:123456789' });
    }, 1000);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
