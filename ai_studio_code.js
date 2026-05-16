import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  const { destination, days } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Eres un experto en viajes. Responde solo con un JSON. Estructura: { \"destination\": \"\", \"itinerary\": [{ \"day\": 1, \"title\": \"\", \"activity\": \"\", \"location\": \"\" }] }" },
      { role: "user", content: `Planifica un viaje a ${destination} por ${days} días.` }
    ],
    response_format: { type: "json_object" },
  });

  return NextResponse.json(JSON.parse(response.choices[0].message.content));
}