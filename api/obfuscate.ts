import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ironBrewObfuscate } from './obfuscation/engine';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid JSON' });
      }
    }

    const { script, config } = body;

    if (!script) {
      return res.status(400).json({ error: 'No script provided' });
    }

    // Call the engine (Now Async to support CLI operations)
    const protectedScript = await ironBrewObfuscate(script, config || {
      vmEncryption: true,
      stringEncryption: true,
      controlFlowFlattening: true,
      memes: false
    });

    return res.status(200).json({ 
      success: true, 
      result: protectedScript
    });

  } catch (error: any) {
    console.error("Obfuscation API Error:", error);
    return res.status(500).json({ error: 'Obfuscation failed internal error' });
  }
}
