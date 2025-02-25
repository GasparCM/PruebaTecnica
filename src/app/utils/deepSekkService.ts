// src/app/utils/deepSekkService.ts
import axios from 'axios';

const apiKey = process.env.DEEPSEEK_API_KEY;
const apiUrl = process.env.DEEPSEEK_API_URL || '';

export async function generateNamesFromDescription(description: string): Promise<string[]> {
  if (!apiKey || !apiUrl) {
    console.error("Api key o url no configurada");
    return ['⚠️ Error de configuración: API Key o URL faltante.'];
  }
  try {
    //per a comprobar en cas de que falle de que esta llegint be les variables
    console.log("API KEY:", apiKey);
    console.log("API URL:", apiUrl);

    const endpoint = 'chat/completions';
    const response = await axios.post(
      `${apiUrl}/${endpoint}`,
      {
        model: "deepseek-chat",//el model que gastem dels que ofereix la api de deeepseek
        messages: [
          {
            role: "system",
            content: `Eres un asistente experto en branding y marketing que genera nombres creativos, llamativos y únicos para startups. Los nombres deben ser cortos, fáciles de recordar y relevantes para la idea descrita. Responde únicamente con una lista numerada de 5 nombres, sin explicaciones ni texto adicional.`,
          },
          {
            role: "user",
            content: `Genera 5 nombres creativos y únicos para una startup basada en la siguiente descripción: "${description}". Responde únicamente con una lista de nombres sin explicaciones adicionales.`,
          },
        ],
        max_tokens: 250, //maximo de tokens
        temperature: 0.8, // Más creatividad
        top_p: 1.0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    // Acceder correctamente a la respuesta de DeepSeek
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      const resultText: string = response.data.choices[0].message.content;
      return resultText
        .split('\n')
        .map((name: string): string => name.replace(/^\d+\.\s*/, '').trim()) // ✅ Tipado explícito corregido aquí
        .filter((name: string): boolean => name !== "");
    } else {
      console.error("Respuesta inesperada de DeepSeek:", response.data);
      return ['⚠️ No se pudieron generar nombres.'];
    }

  } catch (error: any) {
    console.error('❌ Error al comunicarse con DeepSeek:', error);
    if (error.response) {
      console.error("Detalles del error:", error.response.data);
    }
    return ['⚠️ Error al generar nombres. Intenta de nuevo.'];
  }
}
