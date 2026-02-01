import ollama from 'ollama';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, model = 'llama3.2:1b' } = req.body;

    const response = await ollama.chat({
      model,
      messages,
    });

    res.status(200).json(response);
  } catch (error) {
    console.error('Ollama Error:', error);
    res.status(500).json({ error: 'Failed to communicate with Ollama', details: error.message });
  }
}
